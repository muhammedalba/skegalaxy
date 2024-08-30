
const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const categoryModule = require("../../models/categoryModule");




exports.getCategoryByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Category id Format"),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("too short category name")
    .isLength({ max: 70 })
    .withMessage("too short category name")
    .custom(async(value,{ req})=>{
      const gategory = await categoryModule.findOne({name:value});
      if(gategory){
        return Promise.reject(new Error("the gategory already in user"));
      }
         req.body.slug=slugify(value);
        return true
   })
   
,

    validatorMiddleware
  ];
 exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id Format")
  .custom( async (valeu) => 
    await  categoryModule.findById(valeu).then((cate) => {
      if (!cate) {
         return Promise.reject(new Error(`no docment for the id ${valeu} `));
       } 
      return true;
     }))
,
  body("name")
  .optional()

    .custom( async (valeu, { req }) => {
     await  categoryModule.findOne({ name: valeu }).then((cate) => {
       if (cate !== null) {

          return Promise.reject(new Error("category already in user"));
        } 
       
      });
      req.body.slug = slugify(valeu);

 
      return true;
       })
,
check("image").optional(),
  validatorMiddleware,
];
exports.deletCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id Format")

,
  validatorMiddleware,
];

