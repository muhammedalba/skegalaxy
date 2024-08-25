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
// 1- filter product
// const queryStringObj = { ...req.query };
// const excludesFields = ["page", "limit", "fields","sort","keywords"];
// excludesFields.forEach((el) => delete queryStringObj[el]);
// // Apple filteration using {gte,lte,lt,gt}
// const queryString = JSON.stringify(queryStringObj);
// const queryStr =queryString.replace(/\b(gte|lte|lt|gt)\b/g,(match)=> `$${match}`);

// // 2- pagination
// const page = +req.query.page * 1 || 1;
// const limit = +req.query.limit * 1 || 10;
// const skip = (page - 1) * limit;

// // build query
// let mongooseQuery = productModule.find(JSON.parse(queryStr))
//   .skip(skip)
//   .limit(limit)
//   .populate({ path: "category", select: "name -_id" });

// 3- sorting
// sort(price => 1=>9 || -price => 9=>1)
// if(req.query.sort){
//   // price,-sold =>[price -sold ]
//   const sortBy = req.query.sort.split(",").join(" ");
//   mongooseQuery = mongooseQuery.sort(sortBy);

// }else{
//   mongooseQuery = mongooseQuery.sort('createdAt');
// }

// // 4- fields limiting
// if(req.query.fields){
// // fields=title,_id,price, || -price,-title
//   const fields = req.query.fields.split(",").join(" ");
//   // fields= title _id price
//   mongooseQuery = mongooseQuery.select(fields );

// }else{
//   mongooseQuery = mongooseQuery.select("-__v");
// }

// 5- search

// if (req.query.keywords) {
//   const search = req.query.keywords;
//   mongooseQuery = mongooseQuery.find({
//     $or: [
//       { title: { $regex: search, $options: "i" } },
//       { description: { $regex: search, $options: "i" } },
//     ],
//   });

// }

// create  Product

//route  post http://localhost:4000/api/Products
// const createProduct = asyncHandler(async (req, res, next) => {
//   req.body.slug = slugify(req.body.title);

//   imageCover = req.file.filename;
//   console.log(req.file);
//   // eslint-disable-next-line no-undef
//   const data = await productModule.create({ ...req.body, imageCover });
//   return res.status(201).json({ data: data });
// });
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
