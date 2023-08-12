const User = require("../../Models/User");
const verify = require("../../Models/verify");
const bcrypt = require("bcryptjs");
const transporter = require("../../nodemailer");
const crypto = require("crypto");

const generateVerificationCode = () => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000); 
  return verificationCode.toString(); 
};

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.sendStatus(400).send("Missing email or password");
  }

  if (await User.findOne({ email: email }).exec()) {
    return res.sendStatus(234); 
  }

  encryptedPassword = await bcrypt.hash(password, 10); 

  await User.create({
    email: email.toLowerCase(),
    password: encryptedPassword,
  }).then(async (result) => {
    const randomVerificationCode = generateVerificationCode();
    console.log(randomVerificationCode);

    await verify.create({
      verificationCode: randomVerificationCode,
      user: result._id,
    });

    let mail = {
      from: process.env.EMAIL_SENDER, 
      to: email, 
      subject: "Verification link",
      text: `go to http://localhost:3000/verify/${randomVerificationCode}`,
    };

    try {
      transporter.sendMail(mail);
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

  return res.sendStatus(200);
};

module.exports = { register };
