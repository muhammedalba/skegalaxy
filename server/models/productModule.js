const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "produc ttitle required"],
      minlength: [3, "Too short product title name"],
      maxlength: [70, "Too long product title name"],
    },
    //  A B /=> a-b
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "product description required"],
      minlength: [15, "Too short product description name"],
    },
    quantity: {
      type: Number,
      required: [true, "produc quantity required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price required"],
      trim: true,
      max: [20000, "Too long product price "],
    },
    priceAfterDiscount: {
      type: Number,

      trim: true,
      maxlength: [20, "Too long product price "],
    },
    colors: [String],
    imageCover: {
      type: String,
      required: [true, "produc imageCover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "product must be parent category"],
    },
    supCategories: [
      {
        type:mongoose.Schema.ObjectId,
        ref: "SubCategory",
      },
    ],
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    rating: {
      required: false,
      type: Number,
      min: [1, "rating must be above or equal 1.0 "],
      max: [5, "rating must be below or equal 5.0 "],
    },
    ratingsQuantity: {
      required: false,
      type: Number,
      default: 0,
    },
    ratingsAverage:{
      type: Number,
      min: [0, "rating must be above or equal 0.0 "],
      max: [5, "rating must be below or equal 5.0 "],
      default: 0,

    },
    infoProductPdf: {
      type: String,
      
    },
  },
  { timestamps: true ,
    //1- to enable virtual populates
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
     }
  
);
// mongoose  query middeware
productSchema.pre(/^find/, function(next){
  this.populate([
    {
      path: 'category',
      select: 'name',
    },
    {
      path: 'brand',
      select: 'name',
    }
  ]);

  next();
})

// const setImageURL = (doc) => {

//   if (doc.imageCover) {
//     const imageUrl = `${process.env.BASE_URL}/uploads/products/${doc.imageCover}`;
//     doc.imageCover = imageUrl;
  
//   }
//   if (doc.images) {
//     const imagesList = [];
//     doc.images.forEach((image) => {
//       const imageUrl = `${process.env.BASE_URL}/uploads/products/${image}`;
      
//       imagesList.push(imageUrl)
//     });
// doc.images = imagesList
//   }
// };

// //update , findOne and findAll
// productSchema.post("init", (doc) => {
//   setImageURL(doc);
// });
// //  creat
// productSchema.post("save", (doc) => {
//   setImageURL(doc);
// });
// 2- Create a link between reviews with the product
productSchema.virtual("reviews",{
  ref: "Review",
  localField: "_id",
  foreignField: "Product",
  justOne: false,
})
module.exports = mongoose.model("Product", productSchema);
