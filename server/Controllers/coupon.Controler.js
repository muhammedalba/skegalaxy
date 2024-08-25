
const couponModel = require("../models/couponModel");
const factory= require("./handelersFactory");
 


//get all getCoupon
//route  get http://localhost:4000/api/Coupons

exports.getCoupon = factory.getAll(couponModel)

// create  Coupon
//route  post http://localhost:4000/api/Coupons
exports. createCoupon = factory.createOne(couponModel)

// get Brand By Id
//route  get http://localhost:4000/api/Coupons/:id
exports.getCouponById = factory.getOne(couponModel);

// update  Brand
// route  patch http://localhost:4000/api/Coupons/:id
exports.updateCoupon= factory.updateOne(couponModel);


// delet  Brand
//route  delet  http://localhost:4000/api/Coupons/:id
exports.deletCoupon= factory.deleteOne(couponModel);

