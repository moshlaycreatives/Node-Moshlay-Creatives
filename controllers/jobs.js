const Job = require("../models/jobs");

exports.createJob = async (req, res) => {
  try {
    const {
      jobTitle,
      location,
      experienceRequired,
      jobType,
      jobTime,
      jobDescription,
      responsiblities,
      qualification,
    } = req.body;

    const requiredFields = [
      "jobTitle",
      "location",
      "experienceRequired",
      "jobTime",
      "jobDescription",
      "responsiblities",
      "qualification",
    ];
    const missingFieldMessage = validateRequiredFields(
      requiredFields,
      req.body
    );
    if (missingFieldMessage) {
      return res.status(400).json({
        success: false,
        message: missingFieldMessage,
      });
    }
    await Job.create({
      jobTitle,
      location,
      experienceRequired,
      jobType,
      jobTime,
      jobDescription,
      responsiblities,
      qualification,
    });
    return res
      .status(200)
      .json({ success: true, message: "Job Created Successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ permanentDeleted: false });
    if (!jobs) {
      return res
        .status(200)
        .json({ success: true, message: "No Jobs Available" });
    }
    return res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.getJobById = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.find({ _id: jobId });
    if (!job) {
      return res
        .status(400)
        .json({ success: false, message: "No Job with this id" });
    }
    return res.status(200).json({ success: true, data: job });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
