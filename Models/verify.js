const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const verifySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  expireAt: { type: Date, expires: 3600 },
});

module.exports =  mongoose.model("verify", verifySchema);

