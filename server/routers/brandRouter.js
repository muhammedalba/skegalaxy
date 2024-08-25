const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");

const {
  getBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deletBrand,
  uploadBrandImge,
} = require("../Controllers/brand.Controler");
const {
  createBrandValidator,
  getBrandByIdValidator,
  updateBrandValidator,
  deletBrandValidator,
} = require("../utils/validators/branbValidator");
const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");
const  productRouter = require("./productRouter");





const router = express.Router();
router.use("/:brandId/products",productRouter)

router
  .route("/")
  .post(protect, allowedTo(role.ADMIN),uploadBrandImge, createBrandValidator, resizeImge,createBrand)
  .get(getBrands);
router
  .route("/:id")
  .get(protect, allowedTo(role.ADMIN,role.USER,role.MANGER), getBrandByIdValidator, getBrandById)
  .put(protect, allowedTo(role.ADMIN),uploadBrandImge,  updateBrandValidator,resizeImge, updateBrand)
  .delete(protect, allowedTo(role.ADMIN), deletBrandValidator, deletBrand);
module.exports = router;
