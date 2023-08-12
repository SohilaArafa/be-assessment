const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // min: 8,
    // max: 255,
  },
  password: {
    type: String,
    required: true,
    // min: 8,
    // max: 255,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    require : false
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema, "users");
