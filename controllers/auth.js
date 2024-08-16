const User = require("../models/users");
const { validateEmail } = require("../utills/emailValidator");
const { validateRequiredFields } = require("../utills/validateRequiredFields");

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const requiredFields = ["email", "password"];
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
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No User With This Email" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password is wrong" });
    }
    const token = await user.createJWT();
    return res
      .status(200)
      .json({ success: true, message: "User Logged In", token });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
