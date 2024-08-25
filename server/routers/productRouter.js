const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const {
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deletProduct,
  uploadProductImge,
  
} = require("../Controllers/productControler");
const {
  createProductValidator,
  getProductByIdValidator,
  updateProductValidator,
  deletProductValidator,
} = require("../utils/validators/productValidator");
const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");
const reviewRouter = require("./reviewRouter");
const { createFilteropject } = require("../Controllers/productControler");

const router = express.Router({mergeParams:true}); 
// const router = express.Router();
// nested router
router.use("/:ProductId/reviews",reviewRouter)
 
router
  .route("/")
  .post(protect, allowedTo(role.ADMIN),uploadProductImge,createProductValidator,resizeImge, createProduct)
  .get(createFilteropject,getProduct);
router
  .route("/:id")
  .get(getProductByIdValidator, getProductById)
  .put(protect, allowedTo(role.ADMIN),uploadProductImge,updateProductValidator,resizeImge, updateProduct)
  .delete(protect, allowedTo(role.ADMIN), deletProductValidator, deletProduct);
module.exports = router;
