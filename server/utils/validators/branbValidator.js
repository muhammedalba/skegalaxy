const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const brandModule = require("../../models/prandModule ");

exports.getBrandByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id Format"),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand required")
    .isLength({ min: 3 })
    .withMessage("too short Brand name")
    .isLength({ max: 32 })
    .withMessage("too short Brand name")
    .custom(async (valeu, { req }) => {
      await brandModule.findOne({ name: valeu }).then((brand) => {
        if (brand) {
          return Promise.reject(new Error("brand already in user"));
        }
        req.body.slug = slugify(valeu);
        return true;
      });
    }),
  validatorMiddleware,
];
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id Format"),
  check("image").optional(),
  body("name")
    .optional()
    .custom(async (valeu, { req }) => {
      await brandModule.findOne({ name: valeu }).then((brand) => {
        if (brand !== null) {
          return Promise.reject(new Error("brand already in user"));
        }
      });
      req.body.slug = slugify(valeu);
      return true;
    }),

  validatorMiddleware,
];
exports.deletBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id Format"),
  validatorMiddleware,
];
