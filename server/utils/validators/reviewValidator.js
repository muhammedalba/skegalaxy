const { check } = require("express-validator");

const validatorMiddleware = require("../../middleWare/validatorMiddleware");

const reviewModul = require("../../models/reviewModel");
const productModule = require("../../models/productModule");

exports.getRiviewByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Riview id Format"),
  validatorMiddleware,
];

exports.createRiviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings is required")
    .isNumeric()
    .withMessage("ratings  is nomber")
    .isFloat({ min: 1, max: 5 })
    .withMessage("ratings value must be between 1 to 5"),

  check("user").isMongoId().withMessage("Invalid Riview id Format"),
  check("Product")
  .notEmpty()
  .withMessage("Product  is required")
    .isMongoId()
    .withMessage("Invalid Riview id Format")

    // chek if product is maugud
    .custom(async(val) =>{
    await  productModule.findById(val).then((product) => {
        if (!product) return Promise.reject( new Error(`there is no product  for this id${val}`));
       return true;
      })}
     
    )
     // check if logged user  create review before
    .custom(async(val, { req }) =>{
      await  reviewModul
          .findOne({ user: req.user._id, Product: val })
          .then((review) => {
            if (review) {
              return Promise.reject(
                new Error("you already created a review before")
              );
            }
       return true
          });
    })
    ,
  validatorMiddleware,
];
exports.updateRiviewValidator = [
  check("id")
  .notEmpty().withMessage("id  is required")
    .isMongoId()
    .withMessage("Invalid Riview id Format")
    .custom(async(val, { req }) =>
      // check riview ownership before updating
     await reviewModul.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(
            new Error(`there is no  review with id ${val}`)
          );
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`yuo are  not allowed to perform this action`)
          );
        }
        return true;
      })
    ),
  check("ratings")
    .isNumeric()
    .withMessage("ratings  is nomber")
    .isFloat({ min: 1, max: 5 })
    .withMessage("ratings value must be between 1 to 5"),
  validatorMiddleware,
];
exports.deletRiviewValidator = [
  check("id").notEmpty().withMessage("id  is required")
    .isMongoId()
    .withMessage("Invalid Riview id Format")
    .custom(async(val, { req }) => {
      
      // check riview ownership before updating
      if (req.user.role === "user") {
        return await reviewModul.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`there is no  review with id ${val}`)
            );
          }

          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error(`yuo are  not allowed to perform this action`)
            );
          }
        });
      }

      return true;
    }),
  validatorMiddleware,
];
