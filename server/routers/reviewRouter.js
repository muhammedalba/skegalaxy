const express = require("express");
const { protect } = require("../Controllers/auth.Controler");
const allowedTo = require("../utils/allowedTo");
const role = require("../utils/userRoles");
const { createReview, getReviews, getReviewById, updateReview, deletReview, createFilteropject , setReviewIdToBody} = require("../Controllers/review.Controler");
const { createRiviewValidator, updateRiviewValidator, getRiviewByIdValidator, deletRiviewValidator } = require("../utils/validators/reviewValidator");





const router = express.Router({mergeParams:true});  
// mergeParams => allow us to parameters other routes 
// ex: we need acces categoryid from CATEGORY route
router
  .route("/")
  .post(protect, allowedTo(role.USER),setReviewIdToBody,createRiviewValidator,createReview)
  .get(createFilteropject,getReviews);
router
  .route("/:id")
  .get(getRiviewByIdValidator,getReviewById)
  .put(protect, allowedTo(role.USER),setReviewIdToBody,updateRiviewValidator, updateReview)
  .delete(protect, allowedTo(role.USER,role.ADMIN,role.MANGER),deletRiviewValidator, deletReview);
module.exports = router;
