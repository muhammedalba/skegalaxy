const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");
const {
  getAllOrders,
  checkoutSession,
  findSpecificOrder,
  createcashOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderTodelivered,
  uploadorderImge,
} = require("../Controllers/order.Controler");
const router = express.Router();
router.use(protect);
router.route("/:cartId").post(uploadorderImge,resizeImge,createcashOrder);
router.get(
  "/",protect,
  allowedTo(role.ADMIN, role.MANGER, role.USER),
  filterOrderForLoggedUser,
  getAllOrders
);
router.get("/:id", findSpecificOrder);
router.post("/checkout-session/:cartId",protect,allowedTo(role.ADMIN, role.MANGER, role.USER), checkoutSession);
router.put("/:id/pay", allowedTo(role.ADMIN, role.MANGER), updateOrderToPaid);
router.put( "/:id/deliver",allowedTo(role.ADMIN, role.MANGER),updateOrderTodelivered);

module.exports = router;
