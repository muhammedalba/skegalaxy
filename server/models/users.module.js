const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "name required"],
    },
    lastname: {
      type: String,
      required: [true, "name required"],
    },
    // A B /=>ab
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "too short password"],
    },
phone: {
      type: String,
  
    },
    passwordChangeAt:  { type: Date,},
    passwordResetCode: { type: String,},
    passwordResetExpires: { type: Date,},
    passwordResetVerified: { type: Boolean,},
    role: {
      type: String,
      enum: ["user", "admin",'manger'],
      default: "user",
      lowercase: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: "avatar.WebP",
    },
    // child references (one to many)
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        autopopulate: true,
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.Types.ObjectId },
        alias: { type: String },
        details: { type: String },
        Taxnumber: { type: String },
        postalCode: { type: String },
        phone: { type: String },
        city: { type: String },
        Area: { type: String },
        country: { type: String },
        street: { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],
  },

  { timestamps: true }
);
// const setImageURL = (doc) => {
//   if (doc.image) {
//     const imageUrl = `${process.env.BASE_URL}/uploads/users/${doc.image}`;
//     doc.image = imageUrl;
//   }
// };



//update , findOne and findAll
// userSchema.post("init", (doc) => {
 
//     // setImageURL(doc);
  
  
// });
// //  creat
// userSchema.post("save", (doc) => {
//   // setImageURL(doc);
// });

userSchema.pre("save", async function (next) {
  // hashing user pasword
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 11);
  next();
});
const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
