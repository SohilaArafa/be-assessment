const jwt = require("jsonwebtoken");
const config = process.env;

const verfication = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Token is required");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = {verfication};