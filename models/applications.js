const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    fullName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    currentJobLocation: {
      type: String,
      trim: true,
    },
    noticePeriod: {
      type: String,
      trim: true,
    },
    currentSalary: {
      type: String,
      trim: true,
    },
    expectedSalary: {
      type: String,
      trim: true,
    },
    cv: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
