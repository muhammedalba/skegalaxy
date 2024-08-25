
const { check, body } = require("express-validator");
const { default: slugify } = require("slugify");

const validatorMiddleware = require("../../middleWare/validatorMiddleware");
const carouselModul = require("../../models/carouselModel");





exports.getCarouselByIdValidator = [
  check("id").isMongoId().withMessage("Invalid Carousel id Format"),
  validatorMiddleware,
];

exports.createCarouselValidator = [
  check("name")
    .notEmpty()
    .withMessage("Carousel required")
    .isLength({ min: 3 })
    .withMessage("too short Carousel name")
    .isLength({ max: 32 })
    .withMessage("too short Carousel name")
    .custom(async(value,{ req})=>{
      const gatCarousel = await carouselModul.findOne({name:value});
      if(gatCarousel){
        return Promise.reject(new Error("the Carousel already in user"));
      }
         req.body.slug=slugify(value);
        return true
   })
   
,

    validatorMiddleware
  ];
 exports.updateCarouselValidator = [
  check("id").isMongoId().withMessage("Invalid Carousel id Format")
  .custom( async (valeu) => 
    await  carouselModul.findById(valeu).then((carousel) => {
      if (!carousel) {
         return Promise.reject(new Error(`no docment for the id ${valeu} `));
       } 
      return true;
     }))
,
  body("name")
  .optional()

    .custom( async (valeu, { req }) => {
     await  carouselModul.findOne({ name: valeu }).then((carousel) => {
       if (carousel !== null) {

          return Promise.reject(new Error("Carousel already in user"));
        } 
       
      });
      req.body.slug = slugify(valeu);

 
      return true;
       })
,
check("image").optional(),
  validatorMiddleware,
];
exports.deletCarouselValidator = [
  check("id").isMongoId().withMessage("Invalid Carousel id Format")

,
  validatorMiddleware,
];

