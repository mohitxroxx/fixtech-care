const user = require("../models/user")
const Saveuser = require('./user')
const ref = require('./ref')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const { SMTP_EMAIL, SMTP_PASS } = process.env

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASS,
  },
})

module.exports.register = async (req, res, next) => {
  try {
    const {
      country, category, email, fname, mname, lname, bname, contact, city, state, zip
    } = req.body

    if (!country || !category || !email || !fname || !mname || !lname || !bname || !contact || !city || !state || !zip) {
      return res.json({ msg: 'Please fill the form completely', status: false })
    }

    const chkuser = await user.findOne({ email })
    if (chkuser) {
      return res.json({ msg: 'Email already registered with us', status: false })
    }

    const refcode = await ref.gencode()
    const newUser = await Saveuser.registerUser({
      country, category, email, fname, mname, lname, bname, contact, city, state, zip, refcount: 0, refid: refcode
    })

    const mailOptions = {
      from: SMTP_EMAIL,
      to: email,
      subject: "Hello there",
      html: `<body>
                <body style="font-family: Arial, sans-serif margin: 0 padding: 0 background-color: #ffffb3">
                    <table role="presentation" cellspacing="0" cellpadding="0"  width="600"
                        style="margin: 0 auto background-color: #fff padding: 20px border-radius: 5px box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3)">
                        <tr>
                            <td>
                                <h3 style="color: #0838bc font-size: 24px text-align: center margin-bottom: 10px">Welcome To FixTech Care</h3>
                                <hr style="border: 1px solid #ccc margin: 20px 0">
                                <h4 style="font-size: 20px color: #333">Your Referral ID has been activated now</h4>
                                <p style="font-size: 16px color: #333 margin: 20px 0">[When you refer the client dont forget to mention your Referral ID while filling 
                                  the subscription form]
                                  </p>
                                <p style="font-size: 16px color: #333">Here is your referral code ${refcode}</p>
                                <div style="font-size: 16px color: #333 margin-top: 20px text-align: center">
                                    <h5 style="font-size: 18px">Best Regards</h5>
                                    <h5 style="font-size: 18px">FixTech Care</h5> 
                                </div>
                            </td>
                        </tr>
                    </table>
                </body>
            </body>`,
    }
    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("mail sent")
      })
      .catch((err) => {
        console.log(err)
      })
    res.json({ status: true, msg: 'User registered successfully check mail for further instruction and unique refer code!' })
  } catch (error) {
    console.error('Error registering user:', error)
    res.json({ status: false, msg: 'Internal server error' })
  }
}


