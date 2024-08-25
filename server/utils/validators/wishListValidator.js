const { check } = require("express-validator");
const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const productModule = require("../../models/productModule");
const UserModel = require("../../models/users.module");

exports.creatProductToWishlistValidator = [
    check("productId")
      .isMongoId()
      .withMessage("Invalid User id Format")
      .custom(async (val) => {
        const product = await productModule.findById(val);
        if (!product) {
          return Promise.reject(new Error(`there is no product  for this id${val}`));
        }
        return true;
      }),
     validatorMiddleware
  ];
  exports.deletProductFromWishlistValidator = [
    check("productId")
      .isMongoId()
      .withMessage("Invalid User id Format")   
      .custom(async (val) => {
        const product = await UserModel.findOne({wishlist:val});
        if (!product) {
          return Promise.reject(new Error(`there is no product  for this id${val}`));
        }
        return true;
      }),
     validatorMiddleware
  ];