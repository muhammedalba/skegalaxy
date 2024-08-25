
const { uploadImage } = require("../middleWare/uploadImgeMiddlewRE.JS");
const brandModule = require("../models/prandModule ");
const factory= require("./handelersFactory");

// upload single image
const uploadBrandImge=uploadImage([{name:'image',maxCount:1}])


//get all getBrands
//route  get http://localhost:4000/api/brands

const getBrands = factory.getAll(brandModule)

// create  Brand
//route  post http://localhost:4000/api/brands
const createBrand = factory.createOne(brandModule)

// get Brand By Id
//route  get http://localhost:4000/api/brands/:id
const getBrandById = factory.getOne(brandModule);

// update  Brand
// route  patch http://localhost:4000/api/brands:id
const updateBrand= factory.updateOne(brandModule);


// delet  Brand
//route  delet  http://localhost:4000/api/brands:id
const deletBrand= factory.deleteOne(brandModule);
module.exports = {
  getBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deletBrand,

  uploadBrandImge
};
