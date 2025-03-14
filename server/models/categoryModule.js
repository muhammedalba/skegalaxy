const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, " Category name is required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [70, "Too long category name"],
    },
    //  A B  => a-b
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);











const categoryModule = mongoose.model("Category", categorySchema);
module.exports = categoryModule;
