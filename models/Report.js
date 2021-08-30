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
      type: [
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
          downtimes: {
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
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", ReportSchema);
