const  User  = require("../../Models/User");
const  verify  = require("../../Models/verify");

const verifyUser = async (req, res) => {
  let { verificationCode } = req.params;

  const code = await verify.findOne({
    verificationCode: verificationCode,
  });
  if (!code) return res.sendStatus(404); 

  await User.updateOne({ _id: code.user }, { $set: { isVerified: true } });
  //await Verfication.deleteOne({ verificationCode: verificationCode });
  return res.sendStatus(200);
};

module.exports = { verifyUser };
