
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateOneMutation,
  useGetOneQuery,
 
} from "../../../redux/features/api/apiSlice";
import { FaImage } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { MdOutlineTitle } from "react-icons/md";
import { FaAudioDescription } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";

import { ToastContainer } from "react-toastify";


import logo from '../../../imges/logo.webp'
import { errorNotify, infoNotify, successNotify, warnNotify } from "../../../utils/Toast";
import { Fade } from "react-awesome-reveal";






const CreatProduct = () => {



  // get categories from db
  const {
    isLoading: loadingCatego,
    isSuccess: SucccessCatego,
    data: categories,
  } = useGetOneQuery(`categories`);

   // get Brands from db
   const {

    data: Brands,
    error:errorBrand
  } = useGetOneQuery(`brands`);

  console.log(Brands);

  console.log(errorBrand);

  // update data (rtk redux) review
  const [
    createOne,
    {
      error,
      isLoading,
      isSuccess,
    },
  ] = useCreateOneMutation();

  console.log(error);
  // console.log(isLoading);
  // console.log(isSuccess);
  // console.log(product);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    priceAfterDiscount: "",
    quantity: "",
    category: '',
    brand: '',
    
  });
  // const [ProductData, setProductData] = useState({
  //   title: "",
  //   description: "",
  //   price: "",
  //   priceAfterDiscount: "",
  //   quantity: "",
  //   sold: "",
  //   ratingsAverage: "",
  //   ratingsQuantity: "",
  //   category: [],
  //   colors: [],
  //   reviews: [],
  //   supCategories: [],
  //   createdAt: "",
  //   images: [],
  // });
  const [imageCover, setimageCover] = useState(null);
  const [infoProductPdf, setinfoProductPdf] = useState(null);
  const [images, setIimages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [ErrorMsge, setErrorMsge] = useState("");

  const navegate = useNavigate();


 

  // isSuccess
  useEffect(() => {

    if (isSuccess) {
      successNotify(`تمت  العمليه  بنجاح`);

      navegate(`/dashboard/products`);
    }
  }, [isSuccess, navegate]);

  // handel errors
  useEffect(() => {
    error && console.log(error?.data.error);
    if (error?.data.error?.code === "LIMIT_UNEXPECTED_FILE") {
      errorNotify("الحد الاقصى 4 صور");
      setErrorMsge("الحد الاقصى 4 صور");
    }
  
  }, [error]);

  // handleSubmit
  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    if (formData.price <= formData.priceAfterDiscount && formData.price !== '') {
      errorNotify(" يجب ان لايكون السعر بعد التخفيض اكبر من السعر ");
      setErrorMsge(" يجب ان لايكون السعر بعد التخفيض اكبر من السعر ");
      return;
    }
    if (formData.category === undefined || formData.category=='') {
      errorNotify(" يجب ان لايكون القسم فارغ  ");
      setErrorMsge(" يجب ان لايكون القسم فارغ  ");
      return;
    }
    if (formData.brand === undefined || formData.brand=='') {
      errorNotify(" يجب ان لايكون الشركه فارغ  ");
      setErrorMsge(" يجب ان لايكون الشركه فارغ  ");
      return;
    }
    if (formData.quantity <=0) {
      errorNotify(" يجب ان لايكون الكميه فارغ  ");
      setErrorMsge(" يجب ان لايكون الكميه فارغ  ");
      return;
    }
    if (
      formData.title != "" &&
      formData.description.length >= 15  &&
      formData.quantity !== 0 &&
      formData.price > 0 &&
      formData.category !== undefined &&
      formData.category !== "" &&
      images.length <= 4
    ) {  
      // handel form data
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (imageCover) {
        form.append("imageCover", imageCover);
      }
      if (infoProductPdf) {
        form.append("infoProductPdf", infoProductPdf);
      }
      
      if (images) {
        for (let i = 0; i < images?.length ; i++) {
          form.append("images", images[i]);
        }
      }
      //  send form data to server
      createOne({
        url: `/products`,
        body: form,
        method: "post",
      });
      


    } else {
      infoNotify("يجب ملأ جميع الحقول ");
      setErrorMsge("يجب ملأ جميع الحقول ");
    }
  };



  const handleImageChange = (event,type) => {
    const file = event.target.files[0];
    const imgeFile =file.type.split('/')[0]
    const pdfFile =file.type.split('/')[1]

    console.log(pdfFile===type);
    
    if (imgeFile === type) {
      setimageCover(file);
      const previewUrl = URL.createObjectURL(file);

      setPreview(previewUrl);
      
    }else if (pdfFile === type) {
      setinfoProductPdf(file);
   
    }else{
      warnNotify(`الملف ${file.name} ليس بصيغة صحيحة`);
      setErrorMsge(`الملف ${file.name} ليس بصيغة صحيحة`);
      return;
    }
  };

  //  handle Images
  const handleImagesFile = (event) => {
    const files = event.target.files;
    const newImages = [];
    const newPreviews = [];


    // Verify that the photos do not exceed 4 photos
    if (files.length > 4) {
      warnNotify("الحد الاقصى 4 صور");
      setErrorMsge("الحد الاقصى 4 صور");
      return;
    }else{
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Verify that the uploaded file is an image
        const ImageFormat =file.type.split('/')[1];
        const ImagesFormats =['png', 'jpeg', ];
        if (ImagesFormats.includes(ImageFormat)){
          newImages.push(file);
        }else {
          warnNotify(`الملف ${file.name} ليس بصيغة صحيحة`);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);

          // تحديث الحالة بعد قراءة جميع الملفات
          if (newPreviews.length === files.length) {
            setIimages(newImages);
            setPreviews(newPreviews);
            
          }
        };
        reader.readAsDataURL(file);
        
      
      }

    }



  };

  // handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

 


  // view categories
  const showCategorie =
    SucccessCatego && !loadingCatego ? (
      categories.data?.map((category, index) => {
        return (
          <option key={index} value={category._id}>
            {category.name}
          </option>
        );
      })
    ) : (
      <option value="">nodata</option>
    );
      // view categories
  const showBrands =
  SucccessCatego && !loadingCatego ? (
    Brands?.data?.map((brand, index) => {
      return (
        <option key={index} value={brand._id}>
          {brand.name}
        </option>
      );
    })
  ) : (
    <option value="">nodata</option>
  );

  // view imagesShow
  const imagesShow =
    previews?.length > 0 &&
       previews.map((preview, index) => {
          return (
            <div
              key={index}
              className={
                index === previews.length
                  ? "carousel-item active h-100 w-100 rounded"
                  : "rounded carousel-item active h-100 w-100"
              }
              data-bs-interval={`${index}000`}
            >
              <img
                className="d-block h-100 rounded  w-100"
                src={preview}
                alt={`Preview${index}`}
              />
            </div>
          );
        })


  return (
    <>
      <div className="container pt-5">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <form onSubmit={handleSubmit} className="m-auto p-3">
          <Fade delay={0} direction='up' triggerOnce={true}  >

         
          <div className="w-100 py-2">
            <img
              className="logo rounded m-auto d-none d-sm-block"
              src={
                 preview?preview:logo
              }
              alt="avatar"
            />

          </div>
          {  (
          <h2 className="w-75 text-center m-auto py-2 border-bottom">
              {"انشاء منتج"}
          </h2>
          )}
          {/*image*/}
          <div className="col-md-12 py-3">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="image"
            >
              <FaImage color="var(--spancolor)" fontSize="1rem" /> (مطلوب) صورة المنتج
            </label>
            <input
              required
              disabled={isLoading ? true : false}
              className="form-control"
              id="image"
              name="image"
              type="file"
              onChange={(e)=>handleImageChange(e,'image')}
            />
          </div>
          <div className="col-md-12 py-3">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="infoProductPdf"
            >
              <FaImage color="var(--spancolor)"  fontSize="1rem" />     معلومات  المنتج(pdf) 
            </label>
            <input
              
              disabled={isLoading ? true : false}
              className="form-control"
              id="infoProductPdf"
              name="infoProductPdf"
              type="file"
              onChange={(e)=>handleImageChange(e,'pdf')}            />
          </div>
          {/* title */}
          <div className="col-sm-12 py-2">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor={"title"}
            >
              <MdOutlineTitle  color="var(--spancolor)" />
              الاسم المنتج
            </label>

            <input
              disabled={isLoading ? true : false}
              minLength={3}
              maxLength={32}
              className="form-control"
              id={"title"}
              name={"title"}
              type={"Text"}
              placeholder={"ادخل الاسم المنتج"}
              defaultValue={formData.title}
              onChange={handleChange}
            />
          </div>
          {/* description */}
          <div className="col-md-12 py-2">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="description"
            >
              <FaAudioDescription />
              الوصف
            </label>
            <textarea
              className="form-control"
              placeholder="ادخل الوصف"
              name={"description"}
              id="description"
              rows="5"
              maxLength={2000}
              minLength={15}
              onChange={handleChange}
              style={{ maxHeight: 150 }}
              defaultValue={formData.description}
            />
          </div>
          {/* priceAfterDiscount  price */}
          <div className="col-sm-12 py-2">
            <div className="row">
              <div className="col-sm-6">
                <label
                  className="p-1 fs-5 d-flex align-items-center gap-1"
                  htmlFor={"price"}
                >
                  <IoIosPricetag />
                  السعر
                </label>
                <input
                  disabled={ isLoading ? true : false}
                  min={0}
                  max={2000}
                  className="form-control"
                  id={"price"}
                  name={"price"}
                  type={"number"}
                  placeholder={"ادخل سعر المنتج"}
                  defaultValue={formData.price}
                  onChange={handleChange}
                  step={0.01}
                />
              </div>
              <div className="col-sm-6">
                <label
                  className="p-1 fs-5 d-flex align-items-center gap-1"
                  htmlFor={"priceAfterDiscount"}
                >
                  <IoIosPricetag />
                  سعر المنتج بعد الخصم
                </label>
                <input
                   step={0.01}
                  disabled={ isLoading ? true : false}
                  min={0}
                  max={2000}
                  className="form-control"
                  id={"priceAfterDiscount"}
                  name={"priceAfterDiscount"}
                  type={"number"}
                  placeholder={"  ادخل سعر المنتج بعد الخصم"}
                  defaultValue={formData.priceAfterDiscount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* quantity and  category*/}
          <div className="col-md-12 py-2">
            <div className="row">
              <div className="col-sm-6">
                <label
                  className="p-1 fs-5 d-flex align-items-center gap-1"
                  htmlFor={"quantity"}
                >
                  <FaStore />
                  الكميه
                </label>
                <input
                  disabled={ isLoading ? true : false}
                  min={0}
                  max={1000}
                  className="form-control"
                  id={"quantity"}
                  name={"quantity"}
                  type={"number"}
                  placeholder={"ادخل سعر المنتج"}
                  defaultValue={formData.quantity}
                  onChange={handleChange}
                />
              </div>
              <div className="col-sm-6">
                <label
                  className="pt-2  fs-5 d-flex align-items-center gap-2"
                  htmlFor="category"
                >
                  <MdOutlineCategory color="var(--spanColor)" fontSize="1rem" />
                  اختر القسم
                </label>
                <select
                  required
                  id="category"
                  name="category"
                  onChange={handleChange}
                  className="form-select  py-2"
                  value={formData.category}
                  aria-label="Default select example"
                >
                  <option value='' disabled>اختر القسم</option>
                  {showCategorie}
                </select>
              </div>
            </div>
          </div>

          {/* brand subcategory */}
          <div className="col-sm-12">
            <div className="row">
            <div className="col-sm-6">
                <label
                  className="pt-2  fs-5 d-flex align-items-center gap-2"
                  htmlFor="brand"
                >
                  <MdOutlineCategory color="var(--spanColor)" fontSize="1rem" />
                  اختر القسم
                </label>
                <select
                  required
                  id="brand"
                  name="brand"
                  onChange={handleChange}
                  className="form-select  py-2"
                  value={formData.brand}
                  aria-label="Default select example"
                >
                  <option value='' disabled>اختر الشركه</option>
                  {showBrands}
                </select>
              </div>
              {/* supcategory */}
              {/* <div className="col-sm-6">
                <label
                  className="pt-2  fs-5 d-flex align-items-center gap-2"
                  htmlFor="subcategory"
                >
                  <MdOutlineCategory color="var(--spanColor)" fontSize="1rem" />
                  اختر القسم
                </label>
                <select
                  disabled
                  id="subcategory"
            
                  className="form-select  py-2"
       
                  aria-label="Default select example"
                >
                  <option disabled>اختر القسم</option>
                  
                </select>
              </div> */}
            </div>
          </div>
          {/* images */}
          <div className="col-md-12 py-2">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="images"
            >
              <FaImage color="var(--spanColor)" fontSize="1rem" /> صور اضافيه
              للمنتج (اختياري) الحد الاقصى 4 صور
            </label>
            <input
              disabled={ isLoading ? true : false}
              className="form-control"
              id="images"
              name="images"
              type="file"
              multiple
              onChange={handleImagesFile}
            />
          </div>
          {/* Carousel start */}
        {previews?.length >0 &&  <><span className="fs-5 text-center d-block my-2">
            ( {previews?.length} )
            عدد الصور
          </span><div
            style={{ width: "100%", height: "150px" }}
            id="carouselExampleInterval"
            className="carousel slide m-auto mt-5"
            data-bs-ride="carousel"
          >
              <div className="carousel-inner h-100 w-100">
                {imagesShow}
              </div>
              <button
                className="carousel-control-prev h-100"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon "
                  aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next h-100 "
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </div></>
          }
          {/* Carousel end */}

          {/* error msg */}
          {ErrorMsge && (
            <span className="w-100 text-center d-block text-danger pt-3">
              {ErrorMsge}
            </span>
          )}

          <button
            disabled={isLoading ? true : false}
            className="btn btn-primary my-4 d-flex align-items-center"
            type="submit"
          >
            { isLoading ? (
              <span className="spinner-border"></span>
            ) : (
              <span className="">اضف </span>
            )}
          </button> 
          </Fade>
        </form>


      </div>
    </>
  );
};




export default CreatProduct;