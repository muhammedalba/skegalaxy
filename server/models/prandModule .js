const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      unique: [true, "brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [70, "Too long brand name"],
    },
    //  A B /=> a-b
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
//     const imageUrl = `${process.env.BASE_URL}/uploads/brands/${doc.image}`;
//     doc.image = imageUrl;
//   }
// };

// //update , findOne and findAll
// brandSchema.post("init", (doc) => {
//   setImageURL(doc);
// });
// //  creat
// brandSchema.post("save", (doc) => {
//   setImageURL(doc);
// });

const brandModule = mongoose.model("Brand",brandSchema);
module.exports = brandModule;
