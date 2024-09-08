


/* eslint-disable import/no-extraneous-dependencies */
const multer = require("multer");

const fs = require("fs");
// const paths = require('path');
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();
  const fileFilter = (req, file, cb) => {
    const imagType = file.mimetype.split("/")[0];
    const pdfType = file.mimetype.split("/")[1];

  
    if (
      imagType === "image" ||
      (pdfType === "pdf" && req.baseUrl === "/api/products")||
      (pdfType === "pdf" && req.baseUrl === "/api/orders")
    ) {
      cb(null, true);
    } else {
      return cb(new ApiError("file must be an image", 400), false);
    }
  };

  const upload = multer({ storage: multerStorage, fileFilter: fileFilter });

  return upload;
};
// upload single image
exports.uploadImage = (arrayOfFislds) => multerOptions().fields(arrayOfFislds);

// image processing
exports.resizeImge = asyncHandler(async (req, res, next) => {
  // Extract the path once for better readability
  const path = req.baseUrl.split("/")[2];
  // Function to process and save image
  async function processAndSaveImage(buffer, filePath, width, height,quality) {
    try {
      
      await sharp(buffer)
        .resize(width, height, { fit: 'cover', withoutEnlargement: true })
        .toFormat('webp')
        .webp({ quality: quality })
        .toFile(filePath);
    } catch (error) {
      console.error(`خطأ في معالجة الصورة ${filePath}:`, error);
    return  next (new ApiError('خطأ في معالجة الصورة',405))
    }
  }
  if (req.files) {
   
 
    if (req.files.imageCover) {
      const filename = `${path}-imageCover-${Date.now()}-${uuidv4()}.WebP`;
      await processAndSaveImage(
        req.files.imageCover[0].buffer,
        `uploads/${path}/${filename}`,
        225,
        225,
        
       90
        
      );
      req.body.imageCover = filename; // Save image into our db
    }
   // Handling PDF file
   if (req.files.infoProductPdf) {
    const filename = `${path}-infoProductPdf-${uuidv4()}.pdf`;
    const filePath = `uploads/${path}/${filename}`;

    // Save the PDF file directly
    fs.writeFileSync(filePath, req.files.infoProductPdf[0].buffer);

    req.body.infoProductPdf = filename; // Save PDF into our db
  }
  if (req.files.orderPdf) {
    const filename = `${path}-orderPdf-${uuidv4()}.pdf`;
    const filePath = `uploads/${path}/${filename}`;

    // Save the PDF file directly
    fs.writeFileSync(filePath, req.files.orderPdf[0].buffer);

    req.body.orderPdf = filename; // Save PDF into our db
  }
    // Resize and save single image
    if (req.files.image) {
     
      
      const filename = `${path}-${Date.now()}-${uuidv4()}.WebP`;
      await processAndSaveImage(
        req.files.image[0].buffer,
        `uploads/${path}/${filename}`,
        250,
        250,
        90
      );
      req.body.image = filename; // Save image into our db 
    }
    if (req.files.DeliveryReceiptImage) {
     
      
      const filename = `${path}-${Date.now()}-${uuidv4()}.WebP`;
      await processAndSaveImage(
        req.files.DeliveryReceiptImage[0].buffer,
        `uploads/${path}/${filename}`,
        550,
      400,
        100
      );
      req.body.DeliveryReceiptImage = filename; // Save image into our db 
    }
    if (req.files.carouselImage) {
      const filename = `${path}-${Date.now()}-${uuidv4()}.WebP`;
      await processAndSaveImage(
        req.files.carouselImage[0].buffer,
        `uploads/${path}/${filename}`,
        1024 ,
        500,
        100
        
      );
      req.body.carouselImage = filename; // Save image into our db 
    }
    // Resize and save multiple images
    if (req.files.images) {
      req.body.images = [];
      await Promise.all(
        req.files.images.map(async (image, index) => {
          const filename = `${path}-image-${index + 1}-${Date.now()}-${uuidv4()}.WebP`;
          await processAndSaveImage(
            image.buffer,
            `uploads/${path}/${filename}`,
            250,
            150,
            80
          );
          req.body.images.push(filename); // Save image into our db
        })
      );
    }
  }

  // Resize and save image cover
  next();
});

exports.updatemageFromFolder = asyncHandler(async (id, model, req) => {
  // const findImgeInDB = await model.findById(id);
  //  console.log(`${req.protocol}://${req.get('host')}`);
  //  console.log(`${process.env.BASE_URL}`);
  //  console.log( findImgeInDB.image);
    const pathImge = req.baseUrl.split("/").slice(2).join("/");
    const imageInDB = await model.findById(id);
    const deleteFileIfExists = (filePath) => {
      const fullPath = `uploads/${filePath}`;
      if (fs.existsSync(fullPath)) {
        try {
          fs.unlinkSync(fullPath);
        } catch (error) {
          console.error(`Error deleting file ${fullPath}:`, error);
        }
      }
    };
  

  
    if (imageInDB) {
      if (req.body.image && imageInDB.image !== '1.png') {
        deleteFileIfExists(`${pathImge}/${imageInDB.image}`);
      }
      if (req.body.imageCover) {
        deleteFileIfExists(`${pathImge}/${imageInDB.imageCover}`);
      }
      if (req.body.images && imageInDB.images.length > 0) {
        imageInDB.images.forEach((img) => deleteFileIfExists(`${pathImge}/${img}`));
      }
      if (req.body.infoProductPdf) {
        deleteFileIfExists(`${pathImge}/${imageInDB.infoProductPdf}`);
      }
      if (req.body.orderPdf) {
        deleteFileIfExists(`${pathImge}/${imageInDB.orderPdf}`);
      }
      if (req.body.carouselImage) {
        deleteFileIfExists(`${pathImge}/${imageInDB.carouselImage}`);
      }
    }
  
    return true;
  });
  


exports.deletImageFromFolder = asyncHandler(async (id, model, req, type) => {
  // const basePath = paths.join(__dirname, '../uploads');


  // get folder name use base url   => (product/brand/users)
  const pathImge = req.baseUrl.split("/").slice(2).join("/");
 
   
  // Helper function to delete a file if it exists
  const deleteFileIfExists = (filePath) => {
    const fullPath =  `uploads/${filePath}`;
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  };

  // Delete all order from user orders list 
  if (type === 'allorderimage') {
    const imagesInDB = await model.find({ user: id });

    if (imagesInDB && imagesInDB.length > 0) {
      imagesInDB.forEach((image) => {
        deleteFileIfExists(`orders/${image.image}`);
        deleteFileIfExists(`orders/${image.DeliveryReceiptImage}`);
        deleteFileIfExists(`orders/${image.orderPdf}`);
      });
    }

    return true;
  } 
  // delet order from user orders list
  if (type === 'orderimages') {
    const imagesInDB = await model.findById(id);
  
    
    if (imagesInDB ) {
      
        deleteFileIfExists(`orders/${imagesInDB.image}`);
        deleteFileIfExists(`orders/${imagesInDB.DeliveryReceiptImage}`);
        deleteFileIfExists(`orders/${imagesInDB.orderPdf}`);
      }
    

    return true;
  }
  // Delete individual image or PDF
  const imageInDB = await model.findById(id);

  if (imageInDB) {
   
    if (imageInDB.image && imageInDB.image !== '1.png') {
      deleteFileIfExists(`${pathImge}/${imageInDB.image}`);
    }
    if (imageInDB.imageCover) {
      deleteFileIfExists(`${pathImge}/${imageInDB.imageCover}`);
    }
    if (imageInDB.images && imageInDB.images.length > 0) {
      imageInDB.images.forEach((img) => deleteFileIfExists(`${pathImge}/${img}`));
    }
    if (imageInDB.infoProductPdf) {
      deleteFileIfExists(`${pathImge}/${imageInDB.infoProductPdf}`);
    }
    if (imageInDB.orderPdf) {
      deleteFileIfExists(`${pathImge}/${imageInDB.orderPdf}`);
    }
    if (imageInDB.carouselImage) {
      deleteFileIfExists(`${pathImge}/${imageInDB.carouselImage}`);
    }
  }

  return true;
});

