const mongoose = require("mongoose");
const { model } = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const checkSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ["GET", "POST", "PUT", "DELETE"],
    default: "GET",
  },
  protocol: {
    type: String,
    enum: ["http", "https", "tcp"],
  },
  path: {
    type: String,
    default: "/",
  },
  port: {
    type: Number,
    default: 443,
  },
  webhook: {
    type: String,
    default: "",
  },
  timeout: {
    type: Number,
    default: 5, // in seconds
  },
  interval: {
    type: Number,
    default: 10, // in minutes
  },
  threshold: {
    type: Number,
    default: 1,
  },
  authentication: {
    type: {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    required: false,
  },
  httpHeaders: {
    type: Object,
    default: {},
    required: false,
  },
  assert: {
    type: {
      statusCode: {
        type: Number,
        required: true,
      },
    },
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  ignoreSSL: {
    type: Boolean,
    required: false,
  },
});

module.exports = model("Check", checkSchema, "checks");