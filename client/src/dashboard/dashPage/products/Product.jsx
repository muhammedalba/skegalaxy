import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateOneMutation,
  useGetDataQuery,
  useGetOneQuery,

  
} from "../../../redux/features/api/apiSlice";
import { FaImage } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { MdOutlineTitle } from "react-icons/md";
import { FaAudioDescription } from "react-icons/fa";
import { FaStore } from "react-icons/fa6";
import { FaChartLine } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineCategory } from "react-icons/md";

import { ToastContainer } from "react-toastify";
import Rating from "../../../components/Rating/Rating";
import { errorNotify, infoNotify, successNotify, warnNotify } from "../../../utils/Toast";
import { convertDateTime } from "../../../utils/convertDateTime";

const Product = () => {
  // Bring the user number Id
  const { productId } = useParams();

  //get data (rtk redux)
  const {
    isLoading,
    isSuccess,
    data: product,
    error,
  } = useGetOneQuery(`products/${productId}`);
  console.log(product);
  // get categories from db
  const {
    isLoading: loadingCatego,
    isSuccess: SucccessCatego,
    data: categories,
  } = useGetDataQuery(`categories`);
    // get subcategory from the database
    const {
      data: Brands,
      
      isLoading:loadingSub,
      isSuccess:SuccessSub,
    } = useGetDataQuery(`brands`);
    // console.log(Brands,'Brands');



  // update data (rtk redux) review
  const [
    updateOne,
    {
      error: updateError,
      isLoading: loading,
      isSuccess: updatesuccess,
    
    },
  ] = useUpdateOneMutation();
console.log(updateError);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    // priceAfterDiscount: "",
    quantity: "",
    category: "",
    brand:'',

  });
  const [ProductData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
 
    quantity: "",
    sold: "",
    ratingsAverage: '',
    ratingsQuantity: "",
    category: {},
    colors: [],
    priceAfterDiscount: "",
    supCategories: [],
    createdAt: "",
    images: [],
    brand: {},
  });
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
      setProductData({
        title: product.data?.title,
        description: product.data?.description,
        price: product.data?.price,
        quantity: product.data?.quantity,
        sold: product.data?.sold,
        priceAfterDiscount: product.data?.priceAfterDiscount ,
        ratingsAverage: product.data?.ratingsAverage,
        createdAt: convertDateTime(product.data?.createdAt),
        category: product.data?.category?.name,
        brand: product.data.brand?.name,
        images: product.data?.images,
      });
    


      const baseFormData = {
        title: product?.data?.title,
        description: product.data?.description,
        price: product.data?.price,
        quantity: product?.data?.quantity,
        category: product.data.category?._id,
        brand: product.data.brand?._id,
      };
      
      // إضافة priceAfterDiscount فقط إذا كانت موجودة
      const formData = product?.data?.priceAfterDiscount
        ? { ...baseFormData, priceAfterDiscount: product.data.priceAfterDiscount }
        : baseFormData;
      
      setFormData(formData);

    }

   
    if (updatesuccess) {
     successNotify(`تمت  التعديل بنجاح`);

      navegate(`/dashboard/products`);
    }
  }, [product, isSuccess, updatesuccess, navegate]);

  // handel errors
  useEffect(() => {
    if(error?.status ===401){
      warnNotify('انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا')
    }
  },[error?.status])
  useEffect(() => {
    updateError && console.log(updateError?.data.error?.code);
    if (updateError?.data.error?.code === "LIMIT_UNEXPECTED_FILE") {
      errorNotify("الحد الاقصى 4 صور");
      setErrorMsge("الحد الاقصى 4 صور");
    }
    
  }, [updateError, error, ]);

  // handleSubmit
  const handleSubmit = (e) => {
    
   
    e.preventDefault();
    if (formData.price !== '' && +formData.price <= +formData.priceAfterDiscount ) {
      infoNotify(" يجب ان لايكون السعر بعد التخفيض اكبر من السعر ");
      setErrorMsge(" يجب ان لايكون السعر بعد التخفيض اكبر من السعر ");
      return;
    }
    if (formData.title == '' ||  formData.title.length>70  ) {
      infoNotify(" يجب ان لايكون الاسم     اطول من 70 حرف  ");
      setErrorMsge(" يجب ان لايكون الاسم     اطول من 70 حرف  ");
      return;
    }
    if (formData.category === undefined || formData.category == ''||
         formData.brand === undefined || formData.brand == '') {
      infoNotify(" يجب ان لايكون القسم او الشركه فارغ  ");
      setErrorMsge(" يجب ان لايكون القسم او الشركه فارغ  ");
      return;
    }
    if (
      formData.title != "" &&
      formData.description.length >= 20  &&
      formData.quantity !== 0 &&
      formData.price > 0 &&
      
      formData.category !== undefined &&
      formData.category !== "" &&
      formData.brand !== undefined &&
      formData.brand !== "" &&
      images.length <= 4
    ) {  
      // handel form data
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (imageCover) {
        form.append("imageCover", imageCover);
      }
      if (images) {
        for (let i = 0; i < images?.length ; i++) {
          form.append("images", images[i]);
        }
      }
      if (infoProductPdf) {
        
          form.append("infoProductPdf", infoProductPdf);
        
      }
      //  send form data to server
      updateOne({
        url: `/products/${productId}`,
        body: form,
        method: "put",
      });
      


    } else {
      errorNotify("يجب ملأ جميع الحقول ");
      setErrorMsge("يجب ملأ جميع الحقول ");
    }
  };



  const handleImageChange = (event,type) => {
    const file = event.target.files[0];
    const imgeFile =file.type.split('/')[0]
    const pdfFile =file.type.split('/')[1]

 
    
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
      infoNotify("الحد الاقصى 4 صور");
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
          infoNotify(`الملف ${file.name} ليس بصيغة صحيحة`);
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

  // handle rating change
  const handleRatings = () => {};

  

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
      // view brands
  const showbrands =
  SuccessSub && !loadingSub ? (
    Brands.data?.map((brand, index) => {
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
    previews.length > 0
      ? previews.map((preview, index) => {
          return (
            <div
              key={index}
              className={
                index === 3
                  ? "carousel-item active h-100 w-100 rounded"
                  : " rounded carousel-item active h-100 w-100"
              }
              data-bs-interval={`${index}000`}
            >
              <img
                src={preview}
                className="d-block h-100 rounded  w-100"
                alt={`Preview`}
              />
            </div>
          );
        })
      : ProductData.images.map((preview, index) => {
          return (
            <div
              key={index}
              className={
                index === 3
                  ? "carousel-item active h-100 w-100 rounded"
                  : " rounded carousel-item active h-100 w-100"
              }
              data-bs-interval={`${index}000`}
            >
              <img
                src={`${product?.imageUrl}/${preview}`}
                className="d-block h-100 rounded  w-100"
                alt={`Preview`}
              />
            </div>
          );
        });

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
          {/* imge preview */}
          <div className="w-100 py-2">
            <img
              className="logo rounded m-auto d-none d-sm-block"
              src={
                isSuccess && !preview
                  ? `${product?.imageUrl}/${product?.data?.imageCover}`
                  : preview
              }
              alt="avatar"
            />
            {/* rating cammponent */}
            <Rating
              ratingsAverage={isSuccess && ProductData?.ratingsAverage}
              handleRatings={handleRatings}
            />
            {/*  */}
          </div>
          {isSuccess && (
            <h2 className="w-75 text-center m-auto py-2 border-bottom">
              {product.data.title?.slice(0, 20) || "تعديل المنتج"}
            </h2>
          )}
          {/*  image*/}
          <div className="col-md-12 py-3">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="image"
            >
              <FaImage color="var(--spanColor)" fontSize="1rem" /> صورة المنتج
            </label>
            <input
              disabled={isLoading || loading ? true : false}
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
              <FaImage color="var(--spanColor)" fontSize="1rem" />     معلومات  المنتج(pdf) 
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
              <MdOutlineTitle />
              الاسم المنتج
            </label>

            <input
              disabled={isLoading || loading ? true : false}
              minLength={3}
              maxLength={70}
              className="form-control"
              id={"title"}
              name={"title"}
              type={"Text"}
              placeholder={"ادخل الاسم المنتج"}
              defaultValue={ProductData.title}
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
              required
              className="form-control"
              placeholder="ادخل الوصف"
              name={"description"}
              id="description"
              rows="5"
              maxLength={2000}
              minLength={20}
              onChange={handleChange}
              style={{ maxHeight: 150 }}
              defaultValue={ProductData.description}
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
                  step={0.01}
                  disabled={isLoading || loading ? true : false}
                  min={0}
                  max={2000}
                  className="form-control"
                  id={"price"}
                  name={"price"}
                  type={"number"}
                  placeholder={"ادخل سعر المنتج"}
                  defaultValue={ProductData.price}
                  onChange={handleChange}
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
                  disabled={isLoading || loading ? true : false}
                  min={0}
                  max={2000}
                  className="form-control"
                  id={"priceAfterDiscount"}
                  name={"priceAfterDiscount"}
                  type={"number"}
                  placeholder={"  ادخل سعر المنتج بعد الخصم"}
                  defaultValue={ProductData.priceAfterDiscount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* quantity and  sold*/}
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
                  disabled={isLoading || loading ? true : false}
                  min={0}
                  max={1000}
                  className="form-control"
                  id={"quantity"}
                  name={"quantity"}
                  type={"number"}
                  placeholder={"ادخل كميه المنتج"}
                  defaultValue={ProductData.quantity}
                  onChange={handleChange}
                 
                />
              </div>
              <div className="col-sm-6">
                <label
                  className="p-1 fs-5 d-flex align-items-center gap-1"
                  htmlFor={"sold"}
                >
                  <FaChartLine />
                  المبيعات
                </label>
                <input
                  disabled={true}
                  min={0}
                  className="form-control"
                  id={"sold"}
                  name={"sold"}
                  type={"number"}
                  placeholder={" عدد المبيعات"}
                  defaultValue={ProductData.sold}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {/* createdAt and ratingsQuantity */}
          <div className="col-sm-12  py-3">
            <div className="row">
              <div className="col-sm-6">
                <label
                  className="p-1 fs-5 d-flex align-items-center gap-2"
                  htmlFor="createdAt"
                >
                  <BsCalendarDate />
                  تاريخ الانشاء
                </label>
                <input
                  className="form-control"
                  placeholder=" تاريخ الانشاء"
                  name={"createdAt"}
                  id="createdAt"
                  disabled
                  type="date"
                  value={ProductData.createdAt}
                />
              </div>
              <div className="col-sm-6">
                <label
                  className="p-1 fs-5 d-flex align-items-center gap-1"
                  htmlFor="ratingsQuantity"
                >
                  <AiOutlineLike />
                  عدد التقييمات
                </label>
                <input
                  className="form-control"
                  placeholder=" عدد التقييمات"
                  name={"ratingsQuantity"}
                  id="ratingsQuantity"
                  disabled
                  type="number"
                  value={ProductData.ratingsQuantity}
                />
              </div>
            </div>
          </div>
          {/* category brand */}
          <div className="col-sm-12">
            <div className="row">
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
                  <option value='' disabled>اختر الشركه</option>
                  {showCategorie}
                </select>
              </div>
              {/* brand */}
              <div className="col-sm-6">
                <label
                  className="pt-2  fs-5 d-flex align-items-center gap-2"
                  htmlFor="brand"
                >
                  <MdOutlineCategory color="var(--spanColor)" fontSize="1rem" />
                  اختر الشركه
                </label>
                <select
                  id="brand"
                  name="brand"
                  onChange={handleChange}
                  className="form-select  py-2"
                  value={formData.brand}
                  aria-label="Default select example"
                >
                  <option value='' disabled>اختر الشركه</option>
                  {showbrands}
                </select>
              </div>
            </div>
          </div>
          {/* images */}
          <div className="col-md-12 py-2">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="image"
            >
              <FaImage color="var(--spanColor)" fontSize="1rem" /> صور اضافيه
              للمنتج (اختياري) الحد الاقصى 4 صور
            </label>
            <input
              disabled={isLoading || loading ? true : false}
              className="form-control"
              id="image"
              name="image"
              type="file"
              multiple
              onChange={handleImagesFile}
            />
          </div>
          {/* Carousel start */}
      
          <span className="fs-5 text-center d-block my-2">
            ( {imagesShow.length} ) عدد الصور
          </span>
          
        {imagesShow.length > 0 &&      <div
              style={{ width: "100%", height: "150px" }}
              id="carouselExampleInterval"
              className="carousel slide m-auto mt-5"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner h-100 w-100">{imagesShow}</div>
              <button
                className="carousel-control-prev h-100"
                type="button"
                data-bs-target="#carouselExampleInterval"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon "
                  aria-hidden="true"
                />
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
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>}
          
          {/* Carousel end */}

          {/* error msg */}
          {ErrorMsge && (
            <span className="w-100 text-center d-block text-danger pt-3">
              {ErrorMsge}
            </span>
          )}

          <button
            disabled={isLoading || loading ? true : false}
            className="btn btn-primary my-4 d-flex align-items-center"
            type="submit"
          >
            {isLoading || loading ? (
              <span className="spinner-border"></span>
            ) : (
              <span className="">تعديل</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Product;
