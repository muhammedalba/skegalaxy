const { check } = require("express-validator");

const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const subCategoryModel = require("../../models/subCategoryModel");
const categoryModule = require("../../models/categoryModule");

exports.getSubCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id Format"),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("categoryid").optional().isMongoId().withMessage("Invalid Category id Format"),
  check("name")
    .notEmpty()
    .withMessage("SubCategory required")
    .isLength({ min: 2 })
    .withMessage("too short SubCategory name")
    .isLength({ max: 32 })
    .withMessage("too short SubCategory name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    })

    .custom(async (val, { req }) => {
    
      const res = await subCategoryModel.find({
        category: req.params.categoryid || req.body.category
      });
      console.log(val);
      res.forEach((cat) => {
        if (cat.slug ===  req.body.slug)
          throw new Error(`This name actually exists ${val}`);
      });
      return true;
    }),

  check("category")
    .notEmpty()
    .withMessage("category required")
    .isMongoId()
    .withMessage("Invalid Category id Format")
    .custom(
      async (Categoryid) =>
        await categoryModule.findById(Categoryid).then((cate) => {
          if (!cate) {
            return Promise.reject(
              new Error(`no category for this id ${Categoryid}`)
            );
          }
          return true;
        })
    ),
  validatorMiddleware,
];
exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id Format"),
  check("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid Category id Format")
    .custom(
      async (Categoryid) =>
        await categoryModule.findById(Categoryid).then((cate) => {
          if (!cate) {
            return Promise.reject(
              new Error(`no category for this id ${Categoryid}`)
            );
          }
          return true;
        })
    ),

  check("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("too short SubCategory name")
    .isLength({ max: 32 })
    .withMessage("too short SubCategory name")
    .custom(async (valeu, { req }) => {
      await subCategoryModel.findOne({ name: valeu }).then((sub) => {
        if (sub !== null) {
          return Promise.reject(new Error("subCategory already in user"));
        }
        req.body.slug = slugify(valeu);
        return true;
      });
    }),
  validatorMiddleware,
];

exports.deletSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id Format"),
  validatorMiddleware,
];
