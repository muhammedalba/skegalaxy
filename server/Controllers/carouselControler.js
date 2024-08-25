
const { uploadImage } = require("../middleWare/uploadImgeMiddlewRE.JS");
const carouselModul = require("../models/carouselModel");

const factory= require("./handelersFactory");

// upload single image
const uploadcarouselImge=uploadImage([{name:'carouselImage',maxCount:1}])


//get all getcarousel
//route  get http://localhost:4000/api/carousel

const getcarousel = factory.getAll(carouselModul)

// create  carousel
//route  post http://localhost:4000/api/carousel
const createcarousel = factory.createOne(carouselModul)

// get carousel By Id
//route  get http://localhost:4000/api/carousel/:id
const getcarouselById = factory.getOne(carouselModul);

// update  carousel
// route  patch http://localhost:4000/api/carousel:id
const updatecarousel= factory.updateOne(carouselModul);


// delet  carousel
//route  delet  http://localhost:4000/api/carousel:id
const deletcarousel= factory.deleteOne(carouselModul);
module.exports = {
  getcarousel,
  createcarousel,
  getcarouselById,
  updatecarousel,
  deletcarousel,

  uploadcarouselImge
};
