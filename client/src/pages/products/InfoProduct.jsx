import { useParams } from "react-router";
import { useCreateOneMutation, useGetOneQuery } from "../../redux/features/api/apiSlice";
import Rating from "../../components/Rating/Rating";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SkeletonInfoProduct, SkeletonProduct } from "../../utils/skeleton";

import { Fade } from "react-awesome-reveal";

import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { cartitems } from "../../redux/features/Slice/CartSlice";
import { errorNotify, successNotify, warnNotify } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Card from "../../components/card/Card";

import { SlSocialInstagram } from "react-icons/sl";


// share
import { 

  TwitterShareButton, 
  WhatsappShareButton,
  TelegramShareButton,
 
} from 'react-share';
import { 

  TwitterIcon, 
  WhatsappIcon,
  TelegramIcon,

} from 'react-share';





const   InfoProduct=()=> {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const cokkies = new Cookies();
  const token = cokkies.get("token");
 
  // Get data (RTK Redux)
  const {
    data: product,
    error,
    isLoading,
    isSuccess,
  } = useGetOneQuery(`products/${productId}`);

  console.log(product);
// add product to cart
const [
  createOne,
  { error: createError, isLoading: createLoding ,data:crerateData},
] = useCreateOneMutation();
// get category product to cart
 const{isSuccess:categorysuccess ,data:categoryData}
 = useGetOneQuery( `products?category=${product?.data?.category._id}`,{ skip: !product?.data?.category?._id } );

//  categorysuccess&&console.log(categoryData,'categoryData');
//  categoryError&&console.log(categoryData,'categoryError');


const showDownloadBtn=product?.data?.infoProductPdf?'d-block':'d-none'
  //  show Quantity
  const showQuantity =isSuccess && product.data.quantity <= 100 ? " d-block" : "d-none";
// داخل دالة InfoProduct
const shareUrl = window.location.href; // URL الصفحة الحالية
const title =  "شركه مجرة السماء للتجارة "; // العنوان للمشاركة
const description =product?.data?.description?.split('_');



 


  useEffect(()=>{

    if( crerateData?.status ===201  ){
      // Update the number of items in the shopping cart
         dispatch(cartitems(crerateData?.resnumOfCartItems)) 
        successNotify('تم اضافه المنتج بنجاح ')
 
 }
 if(error){
   warnNotify("خطأ في التحقق من المنتج");
  
 }

 if(  createError?.status == 401 ){
     
   warnNotify("يجب عليك تسجيل دخول اولا");
   console.log("login");
 }

},[createError?.status, crerateData?.resnumOfCartItems, crerateData?.status, dispatch, error])

// 
  const handleMouseEnter = useCallback((src) => {
    setSelectedImage(src);
  }, []);

  const card =
    isSuccess &&
    product?.data?.images.map((img, i) => (
      <li
        key={i}
        onMouseEnter={() => handleMouseEnter(`${product?.imageUrl}/${img}`)}
        className="list-group-item p-2 pointer "
        style={{ height: "5rem" }}
      >
        <img
          src={`${product?.imageUrl}/${img}`}
          alt={`Product image ${i + 1}`}
          className="d-block h-100 rounded w-100"
        />
      </li>
    ));


   

   const addToCart = (productId) => {

 
    
    // تحقق من أن المستخدم مسجل الدخول وأن معرف المنتج صالح
    if (token && typeof(productId) !== "undefined") {
      createOne({
        url: "cart",
        method: "POST",
        body: { productId },
      })
      console.log('create');
      

    } else {
      warnNotify("يجب عليك تسجيل دخول اولا");

    
    }
  };

  const DownloadPdf = async( ) => {
    const baseUrl=import.meta.env.VITE_API

        try {
          const response = await fetch(`${baseUrl}/products/${productId}?download=pdf`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/pdf',
            },
          });
  
          // تحقق من حالة الاستجابة
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          // تحقق من نوع المحتوى
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('pdf')) {
            // أنشئ رابط لتحميل الـ PDF
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.pdf'); // اسم الملف الذي سيتم تنزيله
            document.body.appendChild(link);
            link.click();
            link.remove();
            successNotify('تم تنزيل الملف بنجاح')
          } else {
            console.error('Error: Response is not a PDF file');
          }
        } catch (error) {
          console.error('Error fetching PDF:', error);
          errorNotify('حثة مشكلة اثناء تنزيل الملف')
        }
      };
  

  
  




// show info product
  const showData=isSuccess &&  <section className="container my-5 pt-5 px-3">
        <div className="row ">
          {/*product  imges */}
          <div className="col-lg-4 col-md-6 d-xl-flex gap-2">
            <ul
              className="list-group gap-2 d-none d-xl-flex   
                    justify-content-center  "
            >
              <Fade delay={0} direction="up" triggerOnce={true}>
              <li
                className="list-group-item  w-100  col-md-4 pointer"
                style={{ height: "4.5rem" }}
              >
                <img
                  className="d-block h-100 rounded w-100 "
                  src={`${product?.imageUrl}/${product?.data?.imageCover}`}
                  alt="productImge"
                  onMouseEnter={() =>
                    handleMouseEnter(
                      `${product?.imageUrl}/${product?.data.imageCover}`
                    )
                  }
                />
              </li>
              {isSuccess && card}
              </Fade>
            </ul>

            {/* img caver */}
            <Fade delay={0} direction="up" triggerOnce={true} cascade>
              <div
                style={{ height: "22rem", width: "15.5rem" }}
                className="border m-auto  "
              >
                <img
                  style={{ height: "calc(100% - 2.5rem)" }}
                  src={
                    selectedImage ||
                    `${product?.imageUrl}/${product?.data?.imageCover}`
                  }
                  className="d-sm-block m-auto m-xxl-0 w-100 rounded"
                  alt="product"
                />

                <Rating ratingsAverage={product?.data?.ratingsAverage || 3} />

              </div>
            </Fade>
            {/* alt emges */}
            <ul
              className="list-group mt-2 w-100 d-flex align-items-center d-xl-none
                         flex-row  gap-2  flex-wrap    justify-content-center "
            >
              <Fade delay={0} direction="up" triggerOnce={true}>
                <li
                  className="list-group-item p-2  col-md-4 pointer"
                  style={{ maxWidth: "75px", height: "75px" }}
                >
                  <img
                    src={`${product?.imageUrl}/${product?.data?.imageCover}`}
                    className="d-block h-100 rounded w-100 m-auto"
                    alt="category"
                    onMouseEnter={() =>
                      handleMouseEnter(
                        `${product?.imageUrl}/${product?.data.imageCover}`
                      )
                    }
                  />
                </li>
                {isSuccess && card}
              </Fade>
            </ul>
          </div>
          {/* info Product */}
          <div className="col-lg-7 col-md-6  mx-auto ">
              <div className="w-100">
                <div className="card-body text-end p-2">
                  <Fade delay={0} direction="up" triggerOnce={true}>
                        <h1 style={{ backgroundColor: 'var(--bgColor)'}}  className="card-title py-2 mb-3  text-center text-danger border border-end-0 border-start-0">
                          {product?.data.title}
                        </h1>
                        <div className={product?.data.brand?.name?"fw-bold p-1 fs-6 d-flex  border-bottom":"d-none"}>
                          <span className="card-title fs-5 ps-3">الشركة :</span>
                          <span className="text-secondary ps-2">
                            {product?.data.category?.name.split('_')[0]}
                            <br/>
                            {product?.data.category?.name.split('_')[1]}
                          </span>
                        </div>
                        <div className={product?.data.category?.name?"fw-bold  border-bottom p-1  fs-6 pt-2 d-flex": "d-none"}>
                          <span className="card-title fs-5 ps-3 h-100"> القسم :  </span>
                          <span className="text-secondary ps-2">
                            {product?.data.category?.name.split('_')[0]}
                            <br/>
                            {product?.data.category?.name.split('_')[1]}
                          </span>
                        </div>
                        <div className={`fw-bold fs-5 pt-2 d-flex align-items-center  show `}>
                          <span className="card-title ps-3">الكمية  :</span>
                          <span className="text-secondary d-flex align-items-center">
                           ({product?.data?.quantity.toFixed(0)})
                          <span className={`text-danger  fs-6 ${showQuantity} `}>   كميه محدودة يتوفر عند الطلب</span>
                          </span>
                        </div>
                        <div className="fw-bold fs-4 pt-2 d-flex align-items-center">
                          <span className="card-title fs-5 ps-3">سعر المنتج : </span>
                            
                          <span className="text-secondary ">
                            <span className="text-success"> SAR</span>
                            <i className={
                                product?.data?.priceAfterDiscount
                                  ? "text-decoration-line-through px-2"
                                  : "d-none"
                            }>({product?.data.price})</i>

                       
                          </span>
                       
                          
                        </div>
                        <div className="fw-bold fs-4 d-flex align-items-center">
                          <span className="card-title fs-5 ps-1"> السعر بعد الخصم : </span>
                            
                          <span
                              className={
                                product?.data?.priceAfterDiscount
                                  ? " p-1"
                                  : "d-none"
                              }
                            >
                              ( {product?.data?.priceAfterDiscount})
                              <span className="text-success"> SAR</span>
                            </span>
                       
                          
                        </div>



                        
                        <span className="text-danger">(شامل ضريبة القيمة المضافة 15%)</span>
                        </Fade>
                </div>
                
                <div className="fs-6 ">
                  <Fade delay={0} direction="up" triggerOnce={true}>
                    <span className="card-title fs-4 ps-3 d-block"> مواصفات المنتج :  </span>
                    {description.map((ele)=>
                      <p key={ele} className="card-title fs-6 px-2">* {ele}</p> )

                    }

                  </Fade>
                </div>
                <Fade delay={0} direction="up" triggerOnce={true} >
                  <div className=" d-flex align-items-center pt-4 justify-content-evenly flex-wrap gap-2">
                      <button disabled={isLoading|| createLoding} type="button" onClick={()=>addToCart(product?.data._id)} className=" btn btn-primary">
                            إضافة المنتج إلى السلة
                      </button>
                      <button disabled={isLoading|| createLoding} type="button" onClick={DownloadPdf} className={`${showDownloadBtn} btn btn-success`}>
                        تحميل معلومات المنتج  
                      </button>
                  </div>

                </Fade>
                    {/* share to social media */}
                  <div className="d-flex align-items-center justify-content-center gap-2 py-3">
                    {/* زر المشاركة على Twitter */}
                    <TwitterShareButton url={shareUrl} title={title}>
                      <TwitterIcon size={35} round={true} />
                    </TwitterShareButton>

                    {/* زر المشاركة على WhatsApp */}
                    <WhatsappShareButton url={shareUrl} title={title}>
                      <WhatsappIcon size={35} round={true} />
                    </WhatsappShareButton>

                    {/* زر المشاركة على Telegram */}
                    <TelegramShareButton url={shareUrl} title={title}>
                      <TelegramIcon size={35} round={true} />
                    </TelegramShareButton>


                    {/* زر نسخ الرابط للمشاركة على Instagram (مشاركة يدوية) */}
                    <span style={{backgroundColor:'#df0073',padding:'0.4rem'}}  className="border rounded-circle border-1 pointer">
                      <SlSocialInstagram  color="white" fontSize={"1.23rem"} onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        successNotify('تم نسخ الرابط! يمكنك الآن لصقه في Instagram');
                      }}/>
                    </span>
                    
                                    
                    
                  </div>
              </div>
          </div>
        </div>

  
    </section>
    // slide settings
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1// optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 500 },
        items: 2,
        slidesToSlide: 1// optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 500, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };
    // if sucsses and data is not empty  show Similar items
    const showProducts = useMemo(() => {
      if (isLoading) {
        return SkeletonProduct;
      }
  
      if (categorysuccess && categoryData?.data?.length > 0) {
        return categoryData?.data.map((product, index) => (
          <Card key={index} product={product} imgePath={categoryData?.imageUrl}  />
        ));
      }
  
    }, [categoryData?.data, categoryData?.imageUrl, categorysuccess, isLoading]);


    
    
  return (
    <>
        {/* tosat compunenet */}
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
    {isLoading? SkeletonInfoProduct:showData}




   {  categoryData?.data?.length > 1 &&  <div className="container">
      <p style={{ backgroundColor: 'var(--bgColor)'}} className="py-2 my-3  fs-3 border border-end-0 border-start-0 text-center">   منتجات متشابهة : </p>
      <Carousel
            responsive={responsive}
            
            showDots={true}
            ssr={true}
            
            arrows={false}
            focusOnSelect={false}
            
            // centerMode={true}
            lazyLoad={true} // تحسين الأداء باستخدام التحميل المؤجل
            >

      {showProducts} 
   </Carousel>
    </div>}

    </>
  )
}
export default InfoProduct; 