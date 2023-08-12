const User = require("../../Models/User");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.isVerified === false)
      return res.status(400).send("User not verified");

    if (user && (await compare(password, user.password))) {
      const token = sign(
        { user_id: user._id, email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "3h",
        }
      );

      user.token = token;

      await user.save();

      return res.status(200).json({ token: user.token });
    }

    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};
module.exports = { signIn };
