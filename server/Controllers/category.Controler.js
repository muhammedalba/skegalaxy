const { uploadImage } = require("../middleWare/uploadImgeMiddlewRE.JS");
const categoryModule = require("../models/categoryModule");
const factory = require("./handelersFactory");


// upload single image
const uploadCategoryImge=uploadImage([{name:'image',maxCount:1}])

//get all getCategories
//route  get http://localhost:4000/api/categories

const getCategories = factory.getAll(categoryModule);

// create  category
//route  post http://localhost:4000/api/categories
const createCategory =factory.createOne(categoryModule)

// get Category By Id
//route  get http://localhost:4000/api/categories/:id
const getCategoryById = factory.getOne(categoryModule);

// update  category
//route  patch http://localhost:4000/api/categories/:id
const updateCategory = factory.updateOne(categoryModule);

// delet  category
//route  delet  http://localhost:4000/api/category/:id
const deletCategory = factory.deleteOne(categoryModule);
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deletCategory,
  uploadCategoryImge
};
