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

// const setImageURL = (doc) => {
//   if (doc.image) {
   
    
//     const imageUrl = `${process.env.BASE_URL}/uploads/categories/${doc.image}`;
//     // console.log(doc,"doc");
//     doc.image = imageUrl;
//     // console.log(imageUrl,"imageUrl");
//   }
// };

// // update , findOne and findAll
// categorySchema.post("init", (doc) => {
//   setImageURL(doc);
 
// });
// //  creat
// categorySchema.post("save", (doc) => {
//   setImageURL(doc);
// });










const categoryModule = mongoose.model("Category", categorySchema);
module.exports = categoryModule;
