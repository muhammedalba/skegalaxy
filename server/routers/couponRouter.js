const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const { getCoupon, createCoupon, getCouponById, updateCoupon, deletCoupon } = require("../Controllers/coupon.Controler");
const {  getCouponByIdValidator, updateCouponValidator, deletCouponValidator, createCouponValidator } = require("../utils/validators/couponValidator");



const router = express.Router();

router.use(protect, allowedTo(role.ADMIN,role.MANGER));

router
  .route("/")
  .post(createCouponValidator,createCoupon)
  .get(getCoupon);
router
  .route("/:id")
  .get(getCouponByIdValidator, getCouponById)
  .put(updateCouponValidator, updateCoupon)
  .delete(deletCouponValidator, deletCoupon);
module.exports = router;
