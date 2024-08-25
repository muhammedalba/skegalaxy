
const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const couponModule = require("../../models/couponModel");





exports.getCouponByIdValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id Format"),
  validatorMiddleware,
];

exports.createCouponValidator = [
  check("name")
    .notEmpty()
    .withMessage("coupon required")
    .isLength({ min: 3 })
    .withMessage("too short coupon name")
    .isLength({ max: 32 })
    .withMessage("too short coupon name")
    .custom(async(value,{ req})=>{
      const coupon  = await couponModule.findOne({name:value});
      if(coupon ){
        return Promise.reject(new Error("the coupon name already in user"));
      }
         req.body.slug=slugify(value);
        return true
   })
   
,

    validatorMiddleware
  ];
 exports.updateCouponValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id Format")
  .custom( async (valeu) => 
    await  couponModule.findById(valeu).then((copoun) => {
      if (!copoun) {
         return Promise.reject(new Error(`no docment for the id ${valeu} `));
       } 
      return true;
     }))
,
  body("name")
  .optional()

    .custom( async (valeu, { req }) => {
     await  couponModule.findOne({ name: valeu }).then((copoun) => {
       if (copoun !== null) {

          return Promise.reject(new Error("coupon name already in user"));
        } 
       
      });
      req.body.slug = slugify(valeu);

 
      return true;
       })
,

  validatorMiddleware,
];
exports.deletCouponValidator = [
  check("id").isMongoId().withMessage("Invalid coupon id Format")

,
  validatorMiddleware,
];

