const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");


const { resizeImge } = require("../middleWare/uploadImgeMiddlewRE.JS");
const { getcarousel, uploadcarouselImge, createcarousel, getcarouselById, updatecarousel, deletcarousel } = require("../Controllers/carouselControler");
const { createCarouselValidator, getCarouselByIdValidator, deletCarouselValidator, updateCarouselValidator } = require("../utils/validators/carouselValidator");






const router = express.Router();


router
  .route("/")
  .post(protect, allowedTo(role.ADMIN,role.MANGER),uploadcarouselImge, createCarouselValidator,resizeImge,createcarousel)
  .get(getcarousel);
router
  .route("/:id")
  .get(protect, allowedTo(role.ADMIN,role.MANGER), getCarouselByIdValidator, getcarouselById)
  .put(protect, allowedTo(role.ADMIN,role.MANGER), uploadcarouselImge , updateCarouselValidator,resizeImge, updatecarousel)
  .delete(protect, allowedTo(role.ADMIN,role.MANGER),deletCarouselValidator ,deletcarousel);
module.exports = router;
