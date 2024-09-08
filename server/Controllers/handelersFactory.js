const asyncHandler = require("express-async-handler");
const path = require('path');
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const cartModel = require("../models/cartModel");

const {
  deletImageFromFolder,
  updatemageFromFolder,
} = require("../middleWare/uploadImgeMiddlewRE.JS");
const orderModul = require("../models/orderModel");





exports.createOne = (model) =>
  asyncHandler(async (req, res) => {

    
    const imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.baseUrl.split("/").slice(2).join("/")}`;
    
    const Newdocument = await model.create(req.body);

    return res.status(201).json({status:'success', data: Newdocument ,imageUrl});
  });
 
  // module.exports= path

  

  exports.getAll = (model, modelName) =>
    asyncHandler(async (req, res, next) => {
      //    let newUrl;
      // // Make sure it is a single path and does not contain a connected path.
      // if(req.baseUrl.split("/").length >=3 ){

      //   const parts = req.baseUrl.split('/');
      //   const lastWord = parts[parts.length - 1];   
      //   newUrl = `${req.protocol}://${req.get('host')}/uploads/${lastWord}`;

      // }else{

      //   newUrl = `${req.protocol}://${req.get('host')}/uploads/${req.baseUrl.split("/").slice(2, 3).join("/")}`;
        
      // } 
      //  const imageUrl = newUrl.replace(/orders/g, 'products');
const pathParts = req.baseUrl.split('/').filter(part => part);
 // Remove empty parts
const lastSegment = pathParts[pathParts.length - 1];
const newUrl = `${req.protocol}://${req.get('host')}/uploads/${lastSegment}`;
const imageUrl = newUrl.replace(/orders/g, 'products');
      
   
      
  
  
      let filter = {};
      if (req.filteropject) {
        filter = req.filteropject;
      }
  
      // إنشاء نسخة من ApiFeatures وتنفيذ الفلترة والترتيب والبحث وتحديد الحقول
      const apiFeatures = new ApiFeatures(model.find(filter).lean(), req.query)
        .filter()
        .sort()
        .search(modelName)
        .limitFields();
  
      // إنشاء نسخة من الاستعلام لحساب lengthdata بدون التصفح
      const queryForLength = apiFeatures.mongooseQuery.clone();
      const lengthdata = await queryForLength.countDocuments();
  
      // تطبيق التصفح على الاستعلام
      apiFeatures.paginate(lengthdata);
  
      const { mongooseQuery, poginationResult } = apiFeatures;
      const documents = await mongooseQuery;
  
      return res
        .status(200)
        .json({
          status: 'success',
          results: documents.length,
          poginationResult,
          data: documents,
          imageUrl
        });
    });
  
  

exports.getOne = (model, populationOpt) =>
  // populationOpt :The populate of the item to be displayed
  asyncHandler(async (req, res, next) => {
    const imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.baseUrl.split("/").slice(2).join("/")}`;
    // const imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.baseUrl.split("/").slice(2).join("/").replace("orders", "products")}`;
    
    const { id } = req.params;
    // build query
    let query = model.findById(id).lean();
    if (populationOpt) {
      query = query.populate(populationOpt);
    }
    // - execute query
    const document = await query;
    if (!document) {
      return next(new ApiError(` no document for the id ${id}`, 404));
    }

// If there is a request to download a PDF file
    if (req.query.download && req.query.download === 'pdf'  ) {
      
      
      if(req.baseUrl.includes('products')){
          //Specify the path to the file   
      const pdfFilePath = path.join(__dirname, '..', process.env.UPLOADS_DIRECTORY, 'products', document.infoProductPdf);  
      // إرسال ملف PDF للمستخدم
      res.download(pdfFilePath, `${document.infoProductPdf}`, (err) => {
        if (err) {
          return next(new ApiError(`Error sending file: ${err.message}`, 500));
        }
      });
      }
      if(req.baseUrl.includes('orders')){
        //Specify the path to the file   
    const pdfFilePath = path.join(__dirname, '..', process.env.UPLOADS_DIRECTORY, 'orders', document.orderPdf);  
    // إرسال ملف PDF للمستخدم
    res.download(pdfFilePath, `${document.orderPdf}`, (err) => {
      if (err) {
        return next(new ApiError(`Error sending file: ${err.message}`, 500));
      }
    });
    }
    
  
      
    
    
    
    
    
    } else {
      // Send PDF file to user
      res.status(200).json({ status: 'success', data: document, imageUrl });




   
  }});

  exports.deleteOne = (model, type) =>
    asyncHandler(async (req, res, next) => {
      const { id } = req.params;
  
      try {
        if (type === 'user') {
          // 1- Delete user cart
          await cartModel.deleteOne({ user: id });
  
          // 2- Delete images from order folder
          await deletImageFromFolder(id, orderModul, req, 'allorderimage');
  
          // 3- Delete user orders
          await orderModul.deleteOne({ user: id });
            // Delete avatar from user folder
           await deletImageFromFolder(id, model, req);
          // 4- Delete user from database
          const document = await model.findByIdAndDelete(id);
        
  
          if (!document) {
            return next(new ApiError(`No document found for the id ${id}`, 404));
          }
          return res.status(204).send();
        }
        if (type === 'order') {
          // 1- Delete images from order folder
          await deletImageFromFolder(id, model, req, 'orderimages');
          // 2- Delete order from orders list
          const document = await model.findByIdAndDelete(id);
          if (!document) {
            return next(new ApiError(`No document found for the id ${id}`, 404));
          }
          return res.status(204).send();
        }
        // For non-user type operations
        // Delete images from uploads folder
        await deletImageFromFolder(id, model, req);
        const document = await model.findByIdAndDelete(id);
        
  
        if (!document) {
          return next(new ApiError(`No document found for the id ${id}`, 404));
        }
  
        // trigger "remove" event when update document
        await document.deleteOne();
        return res.status(204).send();
      } catch (error) {
        // Handle unexpected errors
        return next(new ApiError(error.message,'error in delet', 500));
      }
    });





exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {

    const imageUrl=`${req.protocol}://${req.get('host')}/uploads/${req.baseUrl.split("/").slice(2).join("/")}`;


    
    const { id } = req.params;

    // update imge from uploads folder
    await updatemageFromFolder(id, model, req);

    const document = await model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new ApiError(` no document for the id ${id}`, 404));
    }

    // trigger "save" event when update document
  
    if ( req.baseUrl === '/api/review' )await document.save(); 
    return res.status(201).json({status:'success', data: document ,imageUrl});
  });
