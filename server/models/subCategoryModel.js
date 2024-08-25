const mongoose  = require("mongoose");

const SupCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // " ba "=>"ab"
      trim: true,
      unigue: [true, "SupCategory must be unigue"],
      minlength: [2, "to short subcategory name"],
      maxlength: [32, "to long subcategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
      
    },
    category: {
      type:mongoose.Schema.ObjectId,
      ref: "Category",
      required:[true,"subcategore must be parent category"]
    },
  },
  { timestamps: true }
);
SupCategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  })

  next();
});
module.exports= mongoose.model("SubCategory",SupCategorySchema)
