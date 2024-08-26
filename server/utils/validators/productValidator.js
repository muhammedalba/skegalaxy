const { check } = require("express-validator");

const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const categoryModule = require("../../models/categoryModule");
const subCategoryModel = require("../../models/subCategoryModel");
const brandModule = require("../../models/prandModule ");


exports.getProductByIdValidator = [
  check("id").isMongoId().withMessage("Invalid product id Format"),
  validatorMiddleware,
];

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("product title required")
    .isLength({ min: 3 })
    .withMessage("too short product title  name")
    .isLength({ max: 40 })
    .withMessage("too long product title  name")
  .custom((val,{ req})=>{
    req.body.slug=slugify(val);
    return true;
   })
,
  check("description")
    .notEmpty()
    .withMessage("product description required")
    .isLength({ min: 15 })
    .withMessage("too short description   name")
    .isLength({ max: 2000 })
    .withMessage("too long product description"),
  check("quantity")
    .notEmpty()
    .withMessage("product quantity required")
    .isNumeric()
    .withMessage("product quantity must be a number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("product sold must be a number"),

  check("price")
    .notEmpty()
    .withMessage("product price required")
    .isNumeric()
    .withMessage("product price must be a number")
    .isLength({ max: 32 })
    .withMessage("to long price "),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("product price must be a number")
    .toFloat()
    .isLength({ max: 32 })
    .withMessage("to long price ")
    .custom((val, { req }) => {
      if (req.body.price <= val) {
        throw new Error("priceAfterDiscount must be lower than price");
      }
      console.log(val);
      
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("availabcolors should  be  array of strings"),
  check("imageCover")
  // .notEmpty().withMessage("imageCover is required")
  ,
  check("images")
    .optional()
    .isArray()
    .withMessage("images should  be  array of strings"),
  check("category")
    .notEmpty()
    .withMessage("category is required")
    .isMongoId()
    .withMessage("invalid id formate")
    .custom((Categoryid) =>
      categoryModule.findById(Categoryid).then((cate) => {
        if (!cate) {
          return Promise.reject(
            new Error(`no category for this id ${Categoryid}`)
          );
        }
      })
    ),
  check("supCategories")
    .optional()
    .isMongoId()
    .withMessage("invalid id formate")
    .custom((SubCategoryIds) =>
      subCategoryModel
        .find({ _id: { $exists: true, $in: SubCategoryIds } })
        .then((subCategory) => {
          console.log(subCategory.length,"subCategory");
          console.log(SubCategoryIds.length,"SubCategoryIds");
          if (
            subCategory.length < 1 ||
            subCategory.length !== SubCategoryIds.length
          ) {
            return Promise.reject(new Error(`invalid subcategory ids`));
          }
        })
    )
    // .custom((val, { req }) =>
    //   subCategoryModel.find({ category: req.body.category }).then(
    //     (subcategories) => {
    //       const subCategoriesIdsInDB = [];
    //       subcategories.forEach((subCategory) => {
    //         subCategoriesIdsInDB.push(subCategory._id.toString());
    //       });
    //       // check if subcategories ids in db include subcategories in req.body (true)
    //       const checker = (target, arr) => target.every((v) => arr.includes(v));
    //       if (!checker(val, subCategoriesIdsInDB)) {
    //         return Promise.reject(
    //           new Error(`subcategories not belong to category`)
    //         );
    //       }
    //     }
    //   )
    // ),

    .custom(async(val, { req }) => 
     await subCategoryModel
        .find({category: req.body.category})
        .then((SubCategories) => {
          const subCategoryIdsInDB = [];
          console.log(SubCategories,"supcategory");
          SubCategories.forEach((subCat) => {
            subCategoryIdsInDB.push(subCat._id.toString());
          });
          
  //check if subcategories ids in db include subcategories in req.body (true)
               // const checker = (target, arr) => target.every((v) => arr.includes(v));
          if (!val.every((v) => subCategoryIdsInDB.includes(v))) {
            return Promise.reject(
              new Error("subcategories not belong to  category")
            );
          }
        })
    ),

  check("brand").optional().isMongoId().withMessage("invalid id formate")
  .custom(async(val,{req}) =>
    await brandModule.findById(val).then((brand) => {
      if (!brand) {
        return Promise.reject(
          new Error(`no brand for this id ${val}`)
        );
      }
    })
  ),

  check("rating")
    .optional()
    .isNumeric()
    .withMessage("product rating must be a number")
    .isLength({ men: 1 })
    .withMessage("rating must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("rating must be below or equal 5.0"),
  check("ratingsQuantity")
    .optional()
    .isNumeric()
    .withMessage("product ratingsQuantity must be a number")
    .isLength({ men: 1 })
    .withMessage("ratingsQuantity must be above or equal 1.0")
    .isLength({ max: 5 })
    .withMessage("ratingsQuantity must be below or equal 5.0"),
  validatorMiddleware,
];
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id Format")
  ,
 check("images").optional()
,
  check("title").optional()
  .custom((val,{req})=>{
  req.body.slug = slugify(val);
  
    return true
    }),
    check("brand").optional().isMongoId().withMessage("invalid id formate")
    .custom(async(val,{req}) =>
      await brandModule.findById(val).then((brand) => {
        if (!brand) {
          return Promise.reject(
            new Error(`no brand for this id ${val}`)
          );
        }
      })
    ),
    check("category")
    .optional()
    .isMongoId()
    .withMessage("invalid id formate")
    .custom(async(Categoryid) =>
      await categoryModule.findById(Categoryid).then((cate) => {
        if (!cate) {
          return Promise.reject(
            new Error(`no category for this id ${Categoryid}`)
          );
        }
      })
    ),
  validatorMiddleware,
];
exports.deletProductValidator = [
  check("id").isMongoId().withMessage("Invalid product id Format")
  ,
  validatorMiddleware,
];
