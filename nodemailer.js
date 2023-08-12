const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD,
  },

  // jsonTransport: true,
  debug: true,
});
transporter.verify((err, info) => {
  if (err) {
    console.log("Error occurred");
  } else {
    // console.log(info.envelope);
    // console.log(info.messageld);
    // console.log(info.message);
    console.log("successfully")
  }
});

module.exports = transporter;
