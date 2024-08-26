/* eslint-disable import/no-extraneous-dependencies */
const multer = require("multer");

const fs = require("fs");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const multerOptions = () => {
  const multerStorage = multer.memoryStorage();
  const fileFilter = (req, file, cb) => {
    const imagType = file.mimetype.split("/")[0];
    const pdfType = file.mimetype.split("/")[1];
  console.log(req.baseUrl,'req.baseUrl');
  
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
// exports.resizeImge = asyncHandler(async (req, res, next) => {

//   if (req.files.imageCover) {
//     const path = req.baseUrl.split("/")[2];
//     const filename = `${path}-imageCover-${Date.now()}-${uuidv4()}.WebP`;
//     await sharp(req.files.imageCover[0].buffer)
//       .resize(2000, 1333)
//       .toFormat("WebP")
//       .WebP({ quality: 90 })
//       .toFile(`uploads/${path}/${filename}`);

//     // save image into our db
//     req.body.imageCover = filename;

//   }
//   if (req.files.image) {

//     const path = req.baseUrl.split("/")[2];
//     const filename = `${path}-${Date.now()}-${uuidv4()}.WebP`;
//     await sharp(req.files.image[0].buffer)
//       .resize(600, 600)
//       .toFormat("WebP")
//       .WebP({ quality: 90 })
//       .toFile(`uploads/${path}/${filename}`);
//     // save image into our db
//     req.body.image = filename;
//
//   }
//   if (req.files.images) {
//     const path = req.baseUrl.split("/")[2];
//     req.body.images = [];
//     await Promise.all(
//       req.files.images.map(async (image, index) => {
//         const filename = `${path}-image-${index + 1}-${Date.now()}-${uuidv4()}.WebP`;
//         await sharp(image.buffer)
//           .resize(800, 800)
//           .toFormat("WebP")
//           .WebP({ quality: 95 })
//           .toFile(`uploads/${path}/${filename}`);
//         // save image into our db
//         req.body.images.push(filename);
//       })
//     );
//   }

//   next();
// });


// image processing
exports.resizeImge = asyncHandler(async (req, res, next) => {
  // Extract the path once for better readability
  const path = req.baseUrl.split("/")[2];
  // Function to process and save image
  async function processAndSaveImage(buffer, filePath, width, height,quality) {
    try {
      await sharp(buffer)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .toFormat('WebP')
        .webp({ quality: quality })
        .toFile(filePath);
    } catch (error) {
      console.error(`خطأ في معالجة الصورة ${filePath}:`, error);
      throw new Error('خطأ في معالجة الصورة');
    }
  }
  if (req.files) {
    if (req.files.imageCover) {
      const filename = `${path}-imageCover-${Date.now()}-${uuidv4()}.WebP`;
      await processAndSaveImage(
        req.files.imageCover[0].buffer,
        `uploads/${path}/${filename}`,
        800,
        600,
        70
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
        800,
        600,
        70
      );
      req.body.image = filename; // Save image into our db 
    }
    if (req.files.carouselImage) {
      const filename = `${path}-${Date.now()}-${uuidv4()}.WebP`;
      await processAndSaveImage(
        req.files.carouselImage[0].buffer,
        `uploads/${path}/${filename}`,
        1920,
        1080,
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
            800,
            600
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
  const findImgeInDB = await model.findById(id);
  //  console.log(`${req.protocol}://${req.get('host')}`);
  //  console.log(`${process.env.BASE_URL}`);
  //  console.log( findImgeInDB.image);

  if (findImgeInDB) {
    if (
      req.body.image &&
      findImgeInDB.image !== `1.png` &&
      findImgeInDB.image !== undefined
    ) {
      // const imgePath = findImgeInDB.image.split("/").slice(3).join("/");
      const baseUrl = req.baseUrl.split("/").slice(2).join("/");
      const imagePath = `uploads/${baseUrl}/${findImgeInDB.image}`;

      // Verify the file exists before deleting it
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

      //
    }
    if (req.body.imageCover || req.body.images) {
      if (req.body.imageCover) {
        // const imgePath = findImgeInDB.imageCover.split("/").slice(3).join("/");
        const pathImge = req.baseUrl.split("/").slice(2).join("/");
        const base = `uploads/${pathImge}/${findImgeInDB.imageCover}`;
        // Verify the file exists before deleting it
        if (fs.existsSync(base)) fs.unlinkSync(base);
      }

      if (req.body.images && findImgeInDB.images.length > 0) {
        findImgeInDB.images.forEach((imge) => {
          console.log(imge);
          // const imgePaths = imge.split("/").slice(3).join("/");
          const pathImge = req.baseUrl.split("/").slice(2).join("/");
          const base = `uploads/${pathImge}/${imge}`;
          // Verify the file exists before deleting it
          if (fs.existsSync(base)) fs.unlinkSync(base);
        });
      }

      // return true;
    }
    if (req.body.carouselImage ) {

      const baseUrl = req.baseUrl.split("/").slice(2).join("/");
      const imagePath = `uploads/${baseUrl}/${findImgeInDB.carouselImage}`;

      // Verify the file exists before deleting it
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

      //
    }
    if (
      req.body.infoProductPdf) {
      // const imgePath = findImgeInDB.image.split("/").slice(3).join("/");
      const baseUrl = req.baseUrl.split("/").slice(2).join("/");
      const imagePath = `uploads/${baseUrl}/${findImgeInDB.infoProductPdf}`;

      // Verify the file exists before deleting it
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

      //
    }
    if (
      req.body.orderPdf) {
      // const imgePath = findImgeInDB.image.split("/").slice(3).join("/");
      const baseUrl = req.baseUrl.split("/").slice(2).join("/");
      const imagePath = `uploads/${baseUrl}/${findImgeInDB.orderPdf}`;

      // Verify the file exists before deleting it
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

      //
    }
  }
});

exports.deletImageFromFolder = asyncHandler(async (id, model, req) => {
 
  
  const findImgeInDB = await model.findById(id);
  if (findImgeInDB) {
    // findImgeInDB.image !==  `${req.protocol}://${req.get('host')}/uploads/users/1.WebP`
    if (findImgeInDB.image !== `1.png` && findImgeInDB.image !== undefined) {
      // const imgePath = findImgeInDB.image.split("/").slice(3).join("/");
      const pathImge = req.baseUrl.split("/").slice(2).join("/");
      const base = `uploads/${pathImge}/${findImgeInDB.image}`;
      // Verify the file exists before deleting it
      if (fs.existsSync(base)) fs.unlinkSync(base);
    }
    if (findImgeInDB.imageCover) {
      // const imgePath = findImgeInDB.imageCover.split("/").slice(3).join("/");
      const pathImge = req.baseUrl.split("/").slice(2).join("/");
      const base = `uploads/${pathImge}/${findImgeInDB.imageCover}`;
      // Verify the file exists before deleting it
      if (fs.existsSync(base)) fs.unlinkSync(base);
    }
    if (findImgeInDB.images && findImgeInDB.images.length !== 0) {
      findImgeInDB.images.forEach((imge) => {
        // const imgePath = imge.split("/").slice(3).join("/");
        const pathImge = req.baseUrl.split("/").slice(2).join("/");
        const base = `uploads/${pathImge}/${imge}`;

        // Verify the file exists before deleting it
        if (fs.existsSync(base)) fs.unlinkSync(base);
      });
      return true;
    }
    if (findImgeInDB.infoProductPdf) {
      // const imgePath = findImgeInDB.image.split("/").slice(3).join("/");
      const baseUrl = req.baseUrl.split("/").slice(2).join("/");
      const imagePath = `uploads/${baseUrl}/${findImgeInDB.infoProductPdf}`;

      // Verify the file exists before deleting it
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

      //
    }
    if (findImgeInDB.orderPdf) {
      // const imgePath = findImgeInDB.image.split("/").slice(3).join("/");
      const baseUrl = req.baseUrl.split("/").slice(2).join("/");
      const imagePath = `uploads/${baseUrl}/${findImgeInDB.orderPdf}`;

      // Verify the file exists before deleting it
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

      //
    }
    if (findImgeInDB.carouselImage ) {

      const pathImge = req.baseUrl.split("/").slice(2).join("/");
      const imagePath = `uploads/${pathImge}/${findImgeInDB.carouselImage}`;

      // Verify the file exists before deleting it
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

      //
    }
  }
});
