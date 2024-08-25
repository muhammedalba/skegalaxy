const mongoose = require("mongoose");

const CouponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, " Coupon name is required"],
      unique: [true, "Coupon must be unique"],
      minlength: [3, "Too short Coupon name"],
      maxlength: [20, "Too long Coupon name"],
    },
    expires: {
      type: Date,

      required: [true, " Coupon expire time is required"],
      // validate: {
      //   validator: function (v) {
      //     return v > Date.now();
      //   },
      //   message: "Coupon must be valid",
      // },
    },
    discount: {
      type: Number,
      required: [true, " Coupon discount is required"],
      min: [1, " Coupon discount must be 1.0"],
      max: [100, " Coupon discount must be 100.0"],
    },
  },
  { timestamps: true }
);

const couponModule = mongoose.model("Coupon", CouponSchema);
module.exports = couponModule;
