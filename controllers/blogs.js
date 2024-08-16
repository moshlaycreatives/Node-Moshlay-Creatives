const Blog = require("../models/blogs");
const { validateRequiredFields } = require("../utills/validateRequiredFields");

exports.createBlog = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, description, readingTime, content } = req.body;
    const requiredFields = ["title", "description", "readingTime", "content"];
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
    if (req.files) {
      let images = req.files.map((file) => "/" + file.path);
      await Blog.create({
        title,
        description,
        readingTime,
        content,
        images,
        createdBy: userId,
      });
      return res
        .status(200)
        .json({ success: true, message: "Blog Added Successfully" });
    }
    return res
      .status(400)
      .json({ success: false, message: "Please Add Atleast One Image" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ permanentDeleted: false }).populate(
      "createdBy",
      "name"
    );
    if (!blogs) {
      return res.status(200).json({ success: true, message: "No Blogs Yet" });
    }
    return res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId }).populate(
      "createdBy",
      "name"
    );
    if (!blog) {
      return res
        .status(400)
        .json({ success: false, message: "No Blog With This Id" });
    }
    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
