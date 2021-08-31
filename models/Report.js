const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: [true, "Please enter the status of the url"],
      enum: ["up", "down"],
    },
    availability: {
      type: Number,
      required: true,
    },
    outages: {
      type: Number,
      required: true,
    },
    faliuresSinceLastAlert: {
      type: Number,
      default: 0
    },
    downtime: {
      type: Number,
      required: true,
    },
    uptime: {
      type: Number,
      required: true,
    },
    responseTime: {
      type: Number,
      required: true,
    },
    check: {
      type: mongoose.Schema.ObjectId,
      ref: "Check",
      required: true,
    },
    history: {
      type: [{}],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
