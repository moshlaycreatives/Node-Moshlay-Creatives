const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      trim: true,
    },
    mainDesignation: {
      type: String,
      trim: true,
    },
    jobDesignation: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    experienceRequired: {
      type: String,
      trim: true,
    },
    jobType: {
      type: String,
      trim: true,
      enum: ["remote", "onsite", "hybrid"],
      default: "onsite",
    },
    jobTime: {
      type: String,
      trim: true,
      // enum:["remote","onsite","hybrid"]
    },
    jobDescription: {
      type: String,
      trim: true,
    },
    permanentDeleted: {
      type: Boolean,
      default: false,
    },
    responsiblities: [String],
    qualification: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
