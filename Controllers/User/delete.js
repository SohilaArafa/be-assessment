const { stopSingleContinousCheck } = require("../Check/checkFunctions");
const User = require("../../Models/User");
const Check = require("../../Models/Check");
const Report = require("../../Models/Report");
const bcrypt = require("bcryptjs");

const deleteUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Both email and password are required.");
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send("Invalid Credentials");
    }

    const checks = await Check.find({ user: user._id });

    for (const check of checks) {
      stopSingleContinousCheck(check);
      await Report.deleteMany({ check: check._id });
      await check.remove();
    }

    await user.deleteOne();
    
    return res.status(200).send("User, checks, and associated reports deleted successfully.");
  } catch (err) {
    console.error(err);
    return res.status(500).send("An error occurred while deleting the user.");
  }
};

module.exports = {
  deleteUser,
};
