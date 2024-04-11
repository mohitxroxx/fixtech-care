const express=require('express')
const cors=require('cors')
const session = require('express-session')
const admin = require("./routes/admin")
const partner = require("./routes/partner")
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');
connectDB()

const app=express()

app.use(cors({
  origin:['http://localhost:3000','https://nupium-1.onrender.com'],
  credentials:true
}))
app.use(express.json())
app.use(cookieParser());

app.use(
  session({
     secret: process.env.SESSION_SECRET,
     resave: false,
     saveUninitialized: false,
     cookie: {},
  })
)


app.get("/",(req,res) => {
  res.status(200).send("Server up and running")
})

app.use("/admin", admin)
app.use("/partner",partner)



app.listen(process.env.PORT, () =>
  console.log(`SERVER UP and running at ${process.env.PORT}`))
