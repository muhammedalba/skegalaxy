
const reviewModule = require("../models/reviewModel");
const factory = require("./handelersFactory");

// nested route
// Create /api/Products/:ProductId/reviews 
const setReviewIdToBody = (req, res, next) => {
  if (!req.body.Product) {
    req.body.Product = req.params.ProductId;
  }
  if (!req.body.user) {
    req.body.user = req.user._id;
  }
  next();
};

// nested route
// Get /api/Products/:ProductId/reviews 
const createFilteropject = (req, res, next) => {

  let filteropject = {};
  if (req.params.ProductId) {
    filteropject = { Product: req.params.ProductId };

    req.filteropject = filteropject;  
   
  }
  next();
};

//get all reviews
//route  get http://localhost:4000/api/review

const getReviews = factory.getAll(reviewModule);

// create  Review
//route  post http://localhost:4000/api/review
const createReview=factory.createOne(reviewModule)

// get Review By Id
//route  get http://localhost:4000/api/review/:id
const getReviewById = factory.getOne(reviewModule);
const updateReview = factory.updateOne(reviewModule);

// update  Review if peoplem in delet image use that
//route  patch http://localhost:4000/api/review/:id
// const updateReview =asyncHandler(async (req, res, next) => {
//     const { id } = req.params;

//     // await updatemageFromFolder(id, model, req);
//     const document = await reviewModule.findByIdAndUpdate(id, req.body, { new: true});
    
//     if (!document) {
//       return next(new ApiError(` no document for the id ${id}`, 404));
//     } 

//     // trigger "save" event when update document
//     await document.save();
//     return res.status(201).json({ data: document });
//   })

// delet  Review
//route  delet  http://localhost:4000/api/review/:id
const deletReview = factory.deleteOne(reviewModule);
module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deletReview,
  setReviewIdToBody,
  createFilteropject
 
};
