const { uploadImage } = require("../middleWare/uploadImgeMiddlewRE.JS");
const productModule = require("../models/productModule");

const factory = require("./handelersFactory");


// nested route
// Get /api/category/:categoryId/subcategory 
const createFilteropject = (req, res, next) => {
  let filteropject = {};
  if (req.params.subcategoryId) {
    filteropject = { supCategories: req.params.subcategoryId };

    req.filteropject = filteropject;
  }
  if (req.params.categoryid) {
    filteropject = { category: req.params.categoryid };

    req.filteropject = filteropject;
  }
  if (req.params.brandId) {
    filteropject = { brand: req.params.brandId };

    req.filteropject = filteropject;
  }
  next();
};

// upload single image
const uploadProductImge=uploadImage([{name:'imageCover',maxCount:1},{name:'images',maxCount:4},{name:'infoProductPdf',maxCount:1}])

//get list of Products
//route  get http://localhost:4000/api/products
//in filter api/products?page=1&limit=10&price[lt]= 50&sold[gt]=32

const getProduct = factory.getAll(productModule,'products');

const createProduct = factory.createOne(productModule);

// get Product By Id
//route  get http://localhost:4000/api/Products/:id
// .populate({ path: "category", select: "name -_id" });
const getProductById = factory.getOne(productModule,"reviews");

// update  Product
//route  patch http://localhost:4000/api/Products/:id
const updateProduct = factory.updateOne(productModule);
// delet Product
//route  delet  http://localhost:4000/api/Products/:id
const deletProduct = factory.deleteOne(productModule);
module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deletProduct,
  uploadProductImge,
  createFilteropject
};
