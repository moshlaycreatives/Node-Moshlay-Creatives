const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    readingTime: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    permanentDeleted: {
      type: Boolean,
      default: false,
    },
    images: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
