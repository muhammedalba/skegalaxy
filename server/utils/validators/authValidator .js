const { check } = require("express-validator");
const { default: slugify } = require("slugify");
const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const UserModel = require("../../models/users.module");


exports.signUpValidator = [
  check("firstname")
    .notEmpty()
    .withMessage("firstname required")
    .isLength({ min: 3 })
    .withMessage("too short User name")
    .isLength({ max: 32 })
    .withMessage("too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    })
    ,

  check("lastname")
    .notEmpty()
    .withMessage("lastname required")
    .isLength({ min: 3 })
    .withMessage("too short User name")
    .isLength({ max: 32 })
    .withMessage("too short User name")
    // .custom((val, { req }) => {
    //   req.body.slug = slugify(val);
    //   return true;
    // })
    ,
  check("image").optional(),
  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((valeu) =>
      UserModel.findOne({ email: valeu }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Eamil already in user"));
          // throw new Error("Eamil already in user");
      
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password  must be at least 6 chracters")
    .isLength({ max: 32 })
    .withMessage("too short User password")
    
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("password Confirmation incorrect");
      } 
      return true;
    }),
  check("passwordConfirm").notEmpty().withMessage("password Confirm required"),

  validatorMiddleware,
];

exports.logInValidator = [

  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid email address")

    ,

  check("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password  must be at least 6 chracters")
    .isLength({ max: 32 })
    .withMessage("too short User password"),
  validatorMiddleware,
];