const express = require("express");
const { protect } = require("../Controllers/auth.Controler");

const role = require("../utils/userRoles");
const {
  addProductToCart,
  getCart,
  removeCartItem,
  clearCart,
  updateCartItemQuantity,
  applayCoupon,
} = require("../Controllers/cartControler");
const allowedTo = require("../utils/allowedTo");


const router = express.Router();

router.use(protect,allowedTo(role.USER,role.MANGER,role.ADMIN));

router.route("/").post(addProductToCart).get(getCart).delete(clearCart);
router
  .route("/applayCoupon").put(applayCoupon)
router.route("/:itemid").put(updateCartItemQuantity).delete(removeCartItem);

module.exports = router;
