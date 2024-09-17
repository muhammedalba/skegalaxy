const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");
const {
  uploadorderImge,
  updateOrderSendInvoice,
  getAllOrders,
  findSpecificOrder,
  createcashOrder,
  filterOrderForLoggedUser,
  updateOrderDeliveryReceiptImage,
  updateOrderToPaid,
  updateOrderTodelivered,
  deletOrder,
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
router.delete("/:id", protect,allowedTo(role.ADMIN),deletOrder);
router.put("/:id/pay", allowedTo(role.ADMIN, role.MANGER), updateOrderToPaid);
router.put( "/:id/deliver",allowedTo(role.ADMIN, role.MANGER),updateOrderTodelivered);
router.post( "/:id/Delivery-receipt-image",allowedTo(role.ADMIN, role.MANGER),uploadorderImge,resizeImge,updateOrderDeliveryReceiptImage);
router.put( "/:id/invoice",allowedTo(role.ADMIN, role.MANGER),uploadorderImge,resizeImge,updateOrderSendInvoice);

module.exports = router;
