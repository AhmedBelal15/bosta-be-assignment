const mongoose = require("mongoose");

const CheckSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name for the check"],
    },
    url: {
      type: String,
      required: [true, "Please enter a url for the check"],
    },
    protocol: {
      type: String,
      required: [true, "Please enter a protocol for the check"],
      enum: ["http", "https", "tcp"],
    },
    path: String,
    port: { type: Number, default: 80 },
    webhook: String,
    timeout: {
      type: Number,
      //5 Seconds
      default: 5,
    },
    interval: {
      type: Number,
      //10 minutes
      default: 10,
      min: 1,
    },
    threshold: {
      type: Number,
      //1 request to send a faliure notification
      default: 1,
    },
    //optional authentication if the url require authentication
    authentication: {
      username: String,
      password: String,
    },
    httpHeaders: {
      type: {},
    },
    assert: {
      statusCode: {
        type: Number,
        default: 200,
      },
    },
    tags: {
      type: [String],
    },
    ignoreSSL: {
      type: Boolean,
      required: [true, "Please specify if we should ignore SSL or not"],
    },
    paused: {
      type: Boolean,
      default: false,
    },
    nextCheck: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Check", CheckSchema);
