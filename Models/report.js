const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
const reportSchema = new Schema({
  checkId: {
    type: SchemaTypes.ObjectId,
    ref: "Check",
    required: false,
  },
  status: {
    type: Number,
    required: false,
  },
  availability: {
    type: Number,
    default: 0,
    required: false,
  },
  outages: {
    type: Number,
    default: 0,
    required: false,
  },
  downtime: {
    type: Number,
    default: 0,
    required: false,
  },
  uptime: {
    type: Number,
    default: 0,
    required: false,
  },
  downtime: {
    type: Number,
    default: 0,
    required: false,
  },
  time: {
    type: Number,
    default: 0,
    required: false,
  },
  responseTime: {
    type: Number,
    default: 0,
  },
  history: {
    type: [Object],
    required: false,
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Report", reportSchema);
