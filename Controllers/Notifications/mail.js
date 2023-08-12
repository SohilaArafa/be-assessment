const transporter = require("../../nodemailer");

const mail = (user, check) => {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: user.email,
    subject: "Check failed",
    text: `Check ${check.name} failed`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      console.log(info.envelope);
    }
  });
};

module.exports = {
  mail,
};
