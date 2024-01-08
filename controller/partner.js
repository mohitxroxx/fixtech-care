const dotenv = require('dotenv')
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")
const express = require("express")
const cookieParser = require('cookie-parser')
const User = require("../models/user")


const app = express()

app.use(express.json())
app.use(cookieParser())
dotenv.config()



const {TOKEN_KEY } = process.env

app.post("/login",async (req, res) => {
    try {
        const { refid,rememberMe} = req.body;

        if (!refid || !rememberMe) {
            return res.json({ msg: 'Please fill the login details completely', status: false })
        }

        const user = await User.findOne({ refid })

        if (!user) {
            return res.json({ msg: 'Invalid credentials', status: false })
        }
        const expiresIn = rememberMe ? '7d' : '2h';         
            const token = jwt.sign({ id: user._id, refid}, TOKEN_KEY,{expiresIn})
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: expiresIn === '7d' ? 7 * 24 * 60 * 60 * 1000: 2 * 60 * 60 * 1000,
        })
        res.cookie('refid', refid, {
            httpOnly: true,
            maxAge: expiresIn === '7d' ? 7 * 24 * 60 * 60 * 1000: 2 * 60 * 60 * 1000,
        })
        res.json({ token })
    } catch (err) {
        console.log(err);
    }
});

app.get("/home", auth, (req,res) => {
    res.status(200).send("Welcome");
})

app.get("/user",async(req,res)=>{
    const refid=req.cookies.refid
    // console.log(refid)
    const user = await User.findOne({ refid })
    return res.json(user)
})

module.exports = app;