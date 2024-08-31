const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "order must be user"],
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
        },
        color: { type: String },
        price: { type: Number },
      },
    ],
    taxtPrice: {
      type: Number,
      default: 0,
    },
    shippingPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      title:String,
      detalis:String,
      Taxnumber:String,
      postalCode:String,
      phone:String,
      city:String,
      Area:String,
      country:String,
      street:String,
    },

    totalOrderPrice: { type: Number },
    VerificationCode: { type: Number },
    paymentMethodType: {
      type: String,
      enum: ["card", "cash"],
      default: "cash",
    },
    image: { type: String,required:true},
    DeliveryReceiptImage: { type: String,},
    orderPdf: {
    type: String,
  },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
 

  },

  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "firstname lastname phone email",
  }).populate({
    path: "cartItems.product",
    select: "title price imageCover ratingsAverage",
  });

  next();
});
const orderModul = mongoose.model("Order", orderSchema);
module.exports = orderModul;
