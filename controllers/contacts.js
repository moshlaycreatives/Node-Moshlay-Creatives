const Contact = require("../models/contacts");
const { validateEmail } = require("../utills/emailValidator");
const { validateRequiredFields } = require("../utills/validateRequiredFields");

exports.createContact = async (req, res) => {
  try {
    const { fullName, phone, email, company, message } = req.body;
    console.log(req.body);
    const requiredFields = ["fullName", "phone", "email", "company", "message"];
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
    await Contact.create({ fullName, phone, email, company, message });
    return res
      .status(200)
      .json({ success: true, message: "Contact Form Submitted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
