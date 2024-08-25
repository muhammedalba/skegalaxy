const mongoose = require("mongoose");
const productModule = require("./productModule");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },

    ratings: {
      type: Number,
      required: [true, "ratings required"],
      min: [1, "ratings must be 1.0"],
      max: [5, "ratings must be 5.0"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "reviews must be user"],
    },
       // parent references (one to many)
    Product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "reviews must be product"],
    },
  },
  { timestamps: true }
);
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname",
  });

  next();
});

//  Calculate the number of ratings and their average
reviewSchema.statics.calcAverageRatingsAndQuality = async function (ProductId) {
  
  const result = await this.aggregate([
    //stage 1- :get all reviews in the product
    {
      $match: { Product: ProductId },
    },
    //  stage 2-: groupig reviews based on productid and calc avgratings ,ratingsQuality
    {
      $group: {
        _id: ProductId,

        avgRatings: { $avg: "$ratings" },
        ratingsQuantity: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await productModule.findByIdAndUpdate(ProductId, {
      ratingsQuantity: result[0].ratingsQuantity,
      ratingsAverage: result[0].avgRatings,
    });
  } else {
    await productModule.findByIdAndUpdate(ProductId, {
      ratingsQuantity: 0,
      ratingsAverage: 0,
    });
  }

};
// Run  when saving and updating the ratings 
reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRatingsAndQuality(this.Product);
});
// Run  when deletion and updating the ratings 
reviewSchema.post("deleteOne", { document: true }, async function () {
  await this.constructor.calcAverageRatingsAndQuality(this.Product);
  
});
const reviewModul = mongoose.model("Review", reviewSchema);
module.exports = reviewModul;
