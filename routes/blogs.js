const blogRouter = require("express").Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
} = require("../controllers/blogs");
const userAuth = require("../middlewares/userAuth");
const upload = require("../utills/upload");

blogRouter.post("/createBlog", userAuth, upload.any(), createBlog);
blogRouter.get("/getAllBlogs", getAllBlogs);
blogRouter.get("/getBlogId/:blogId", getBlogById);

module.exports = blogRouter;
