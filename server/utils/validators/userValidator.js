const slugify = require("slugify");
const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const UserModel = require("../../models/users.module");


exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id Format"),
  validatorMiddleware,
];
exports.createUserValidator = [
  body("image").optional(),
  body("firstname")
    .notEmpty()
    .withMessage("firstname required")
    .isLength({ min: 3 })
    .withMessage("too short User name")
    .isLength({ max: 32 })
    .withMessage("too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

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

  check("email")
    .notEmpty()
    .withMessage("email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async(valeu, { req }) => {
     await UserModel.findOne({ email: valeu }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Eamil already in user"));
        }
      });
    }),

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

  check("role").optional(),

  check("phone")
    .optional()
    .isMobilePhone("ar-SA")
    .whitelist("Invalid  phone only accepted SA phone number"),

  validatorMiddleware,
];
exports.updateUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User id Format")
    .custom(async (value) => {
      const user = await UserModel.findById(value);
      if (user) {
      
        return true;
      }
      return Promise.reject(new Error("there is no user  for this id"));
    }),
  check("firstname")
    .optional()
    .isLength({ min: 3 })
    .withMessage("too short User name")
    .isLength({ max: 32 })
    .withMessage("too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("lastname")
    .optional()

 
    .isLength({ min: 3 })
    .withMessage("too short User name")
    .isLength({ max: 32 })
    .withMessage("too short User name")
    // .custom((val, { req }) => {
    //   req.body.slug = slugify(val);
    //   return true;
    // })
    ,

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (valeu, { req }) =>
    
    await  UserModel.findOne({ email: valeu }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Eamil is already in use"));
        }  
        return true;
      })
    ),
  check("role").optional(),
  check("phone")
    .optional()
    .isMobilePhone("ar-SA")
    .whitelist("Invalid  phone only accepted SA phone number"),

  check("image").optional(),

  validatorMiddleware,
];
exports.deletUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid User id Format")
    ,
  validatorMiddleware,
];
exports.changePasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id Format"),
  body("password")
    .notEmpty()
    .withMessage("password required")
    .isLength({ min: 6 })
    .withMessage("password  must be at least 6 chracters")
    .isLength({ max: 32 })
    .withMessage("too short User password")
    .custom(async (val, { req }) => {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        throw new Error("there is no user  for this id");
      }
      return true;
    }),

  validatorMiddleware,
];

exports.updatLoggedUserValidator = [
  check("firstname")
    .optional()
    .isLength({ min: 3 })
    .withMessage("too short User name")
    .isLength({ max: 32 })
    .withMessage("too short User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("lastname")
    .optional()
    .isLength({ min: 3 })
    .withMessage("too short User name")
    .isLength({ max: 32 })
    .withMessage("too short User name")
    // .custom((val, { req }) => {
    //   req.body.slug = slugify(val);
    //   return true;
    // })
    ,

  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (valeu, { req }) =>
    await  UserModel.findOne({ email: valeu }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Eamil is already in use"));
        }
        return true;
      })
    ),

  check("phone")
    .optional()
    .isMobilePhone("ar-SA")
    .whitelist("Invalid  phone only accepted SA phone number"),

  check("image").optional(),

  validatorMiddleware,
];