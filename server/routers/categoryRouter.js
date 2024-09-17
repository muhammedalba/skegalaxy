const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");


const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deletCategory,
  uploadCategoryImge,
} = require("../Controllers/category.Controler");
const {
  createCategoryValidator,
  getCategoryByIdValidator,
  updateCategoryValidator,
  deletCategoryValidator,
} = require("../utils/validators/categoryValidator");
const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");
const productRouter =require("./productRouter")



const router = express.Router();

router.use("/:categoryid/products",productRouter)
router
  .route("/")
  .post(protect, allowedTo(role.ADMIN),uploadCategoryImge,
 createCategoryValidator,resizeImge, createCategory)
  .get(getCategories);
router
  .route("/:id")
  .get(getCategoryByIdValidator, getCategoryById)
  .put(protect, allowedTo(role.ADMIN),uploadCategoryImge
  , updateCategoryValidator,resizeImge, updateCategory)
  .delete(
    protect,
    allowedTo(role.ADMIN),
    deletCategoryValidator,
    deletCategory
  );
module.exports = router;
