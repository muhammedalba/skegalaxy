const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const {
  createSubCategory,
  getsubCategory,
  getSubCategoryById,
  updateSubCategory,
  deletSubCategory,
  createFilteropject,
  setCategoryIdToBody,
  
} = require("../Controllers/subcategory.Controler");

const {
  createSubCategoryValidator,
  getSubCategoryByIdValidator,
  updateSubCategoryValidator,
  deletSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const productRouter =require("./productRouter")

const router = express.Router({mergeParams:true});  
// mergeParams => allow us to parameters other routes 
// ex: we need acces categoryid from CATEGORY route
router.use("/:subcategoryId/products", productRouter)

router
  .route("/")
  .get(createFilteropject,getsubCategory)
  .post(
    protect,
    allowedTo(role.ADMIN),
    setCategoryIdToBody,
    createSubCategoryValidator,
    createSubCategory
  );

router
  .route("/:id")
  .get(getSubCategoryByIdValidator, getSubCategoryById)
  .put(
    protect,
    allowedTo(role.ADMIN),
    updateSubCategoryValidator,
    updateSubCategory
  )
  .delete(
    protect,
    allowedTo(role.ADMIN),
    deletSubCategoryValidator,
    deletSubCategory
  );
module.exports = router;
