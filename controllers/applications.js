const Application = require("../models/applications");
const { validateEmail } = require("../utills/emailValidator");
const { validateRequiredFields } = require("../utills/validateRequiredFields");

exports.applyNow = async (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      experience,
      currentJobLocation,
      noticePeriod,
      currentSalary,
      expectedSalary,
    } = req.body;
    const requiredFields = [
      "jobId",
      "fullName",
      "email",
      "phone",
      "experience",
      "currentJobLocation",
      "noticePeriod",
      "currentSalary",
      "expectedSalary",
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
    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid" });
    }
    if (req.file) {
      let cv = "/" + req.file.path;
      await Application.create({
        jobId,
        fullName,
        email,
        phone,
        experience,
        currentJobLocation,
        noticePeriod,
        currentSalary,
        expectedSalary,
        cv,
      });
      return res
        .status(200)
        .json({ success: true, message: "Applied Successfully" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
