const subcategoryModule = require("../models/subCategoryModel");
const factory = require("./handelersFactory");


// nested route
// Create
const setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryid;
  }
  next();
};

// nested route
// Get /api/category/:categoryId/subcategory 
const createFilteropject = (req, res, next) => {
  let filteropject = {};
  if (req.params.categoryid) {
    filteropject = { category: req.params.categoryid };

    req.filteropject = filteropject;
  }
  next();
};

//get all subcategory
//route  get http://localhost:4000/api/subcategory

const getsubCategory = factory.getAll(subcategoryModule);

// create  subcategory
//route  post http://localhost:4000/api/subcategory
const createSubCategory = factory.createOne(subcategoryModule);

// get Category By Id
//route  get http://localhost:4000/api/category/:id
const getSubCategoryById = factory.getOne(subcategoryModule);

// update  category
//route  patch http://localhost:4000/api/subcategory/:id
const updateSubCategory = factory.updateOne(subcategoryModule);

// delet  category
//route  delet  http://localhost:4000/api/category/:id
const deletSubCategory = factory.deleteOne(subcategoryModule);
module.exports = {
  createSubCategory,
  getsubCategory,
  getSubCategoryById,
  updateSubCategory,
  deletSubCategory,
  createFilteropject,
  setCategoryIdToBody,
};
