const asyncHandler = require("express-async-handler");
const { uploadImage } = require("../middleWare/uploadImgeMiddlewRE.JS");
const productModule = require("../models/productModule");
const factory = require("./handelersFactory");
const ApiError = require("../utils/apiError");

const {
  deletImageFromFolder,
} = require("../middleWare/uploadImgeMiddlewRE.JS");

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

// delet iamges from Product
const DeletImagesFromProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
 
  
  try {
    const product = await productModule.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await deletImageFromFolder(id, productModule, req, 'deleteimges'); // قم بتمرير قائمة الصور للحذف

    const updatedProduct = await productModule.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          images: [], 
        },
      },
      { new: true }
    );

    res.status(200).json({ message: 'All images deleted successfully', updatedProduct });

  } catch (error) {
    next(error);
  }
});




module.exports = {
  getProduct,
  getProductById,
  createProduct,
  updateProduct,
  deletProduct,
  DeletImagesFromProduct,
  uploadProductImge,
  createFilteropject
};
