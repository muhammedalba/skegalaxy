import "./card.css";
import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { cartitems } from "../../redux/features/Slice/CartSlice";
import { Link } from "react-router-dom";

import { MdAddShoppingCart } from "react-icons/md";
import { Fade } from "react-awesome-reveal";
import { useCreateOneMutation } from "../../redux/features/api/apiSlice";
import PropTypes from "prop-types";

const Rating = React.lazy(() => import("../Rating/Rating"));
const CiHeart = lazy(() => import("react-icons/ci").then(module => ({ default: module.CiHeart })));
const PiEyeThin = lazy(() => import("react-icons/pi").then(module => ({ default: module.PiEyeThin })));
const IoShareSocial = lazy(() => import("react-icons/io5").then(module => ({ default: module.IoShareSocial })));
const SlSocialInstagram = lazy(() => import( "react-icons/sl").then(module => ({ default: module.SlSocialInstagram })));
// import { PiEyeThin } from "react-icons/pi";
// import { IoShareSocial } from "react-icons/io5";
// import { SlSocialInstagram } from "react-icons/sl";


import { successNotify, warnNotify } from "../../utils/Toast";


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

const Card = ({ product, imgePath,reverse }) => {


  

// add product to cart
  const [
    createOne,
    { error: createError,isSuccess:  successCreeate, isLoading: createLoding ,data:crerateData},
  ] = useCreateOneMutation();

  //  show Quantity
  const showQuantity =product.quantity <= 100 && product.quantity !== 0? " d-block" : "d-none";
  const showQuantityMsg =  product.quantity === 0 ? " d-block" : "d-none";



    const dispatch = useDispatch();
    const [display ,setDisplay]=useState(false);
    const [displed ,setdispled]=useState(false);
    const cokkies = new Cookies();
    const token = cokkies.get("token");
    const shareUrl = window.location.href; // URL الصفحة الحالية
    const title =  "   شركه مجرة السماء! للتجارة"; // العنوان للمشاركة
  
  useEffect(()=>{
    if(  createError?.status == 401 ){
      
       warnNotify("يجب عليك تسجيل دخول اولا");
    
     }
  },[createError?.status])



useEffect(() => {
  if(crerateData?.status==='success'){
    successNotify('تم اضافه المنتج بنجاح ')
    setdispled(false); 
  }
},[crerateData])



  useEffect(()=>{

    if( crerateData?.status === 201  ){
      // Update the number of items in the shopping cart
         dispatch(cartitems(crerateData?.resnumOfCartItems)) 
        successNotify('تم اضافه المنتج بنجاح ')
        setdispled(false); 
     
 }
 

},[crerateData?.resnumOfCartItems, crerateData?.status, dispatch])





useEffect(()=>{

  // displed create 
if(createLoding){
  setdispled(true); 
}
if(createError || successCreeate){
  setdispled(false) 
}
},[createError, createLoding, successCreeate])


// add to cart our wish list
  const addproducToCartOurWishlist = useCallback((productId,route) => {
 
    
    // تحقق من أن المستخدم مسجل الدخول وأن معرف المنتج صالح
    if (token && typeof(productId) !== "undefined") {
      
      
      !displed &&   createOne({
        url: `${route}`,
        method: "POST",
        body: { productId },
      })
      setdispled(true)
    } else {
      warnNotify("يجب عليك تسجيل دخول اولا");
     
    }
  }, [createOne, displed, token]);


 const showIcons=()=>{
  setDisplay(!display)
 }
 const scrollToTop = useCallback(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [])

  return (
    <div className="card-product mt-3 m-auto ">

   
    
          <Suspense>
             <IoShareSocial style={{ top: "4rem" }} className="cart-icon mx-2" onClick={showIcons} />
          </Suspense>
          <Suspense>
             <CiHeart  onClick={() => addproducToCartOurWishlist(product?._id,'wishlist')}  style={{ top: "1rem",left:'auto'}} className="cart-icon-Heart mx-2 start-0 " />
          </Suspense>
      <Link onClick={scrollToTop} to={`/products/${product?._id}`}>
           <Suspense>
               <PiEyeThin style={{ top: "1rem" }} className="cart-icon mx-2 " />
           </Suspense>
   
    
     
      <div style={{    transform:display?'translateX(0)':' translateX(158%)'}}
       className=" cart-share  d-flex align-items-center justify-content-center gap-2 flex-column">
        {/* زر المشاركة على Twitter */}
        <TwitterShareButton url={`${shareUrl}products/${product.id}`} title={title}>
          <TwitterIcon size={35} round={true} />
        </TwitterShareButton>

        {/* زر المشاركة على WhatsApp */}
        <WhatsappShareButton url={`${shareUrl}products/${product.id}`} title={title}>
          <WhatsappIcon size={35} round={true} />
        </WhatsappShareButton>

        {/* زر المشاركة على Telegram */}
        <TelegramShareButton url={`${shareUrl}products/${product.id}`} title={title}>
          <TelegramIcon size={35} round={true} />
        </TelegramShareButton>


        {/* زر نسخ الرابط للمشاركة على Instagram (مشاركة يدوية) */}
        <button  type="button" className="border rounded-circle border-1 pointer" onClick={() => {
            navigator.clipboard.writeText(`${shareUrl}/${product.id}`);
            successNotify('تم نسخ الرابط! يمكنك الآن لصقه في Instagram');
          }}style={{backgroundColor:'#df0073',padding:'0.4rem'}} >
            
         
            <Suspense>
              <SlSocialInstagram  color="white" fontSize={"1.23rem"}/>          
            </Suspense>
        </button>
        
                        
        
      </div>
      {/* <IoIosHeartEmpty className="cart-icon" /> */}
      <div className="imgBox pt-1">
        <img
         loading="lazy"
            decoding="async"
          width={225} 
          src={`${imgePath}/${product?.imageCover}`}
          alt="mouse corsair"
          className="mouse w-100 h-100"
        />
      </div> 
      
      </Link>
      <div className="contentBox z-3">
        <Fade
          className="w-100 text-center"
          duration={500} delay={0}
          direction="up"
          triggerOnce={true}
          cascade
        >
          <Suspense >
              <Rating ratingsAverage={product?.ratingsAverage || 3} />

          </Suspense>
          <h3 style={{minHeight:'4rem',}}  className="my-1">
            <span className="d-block w-100">

            {product?.title?.split("_")[0]} 
            </span>
            <span className="d-block w-100">

            {product?.title?.split("_")[1]} 
            </span>
            </h3>
          {/* <h3 className="my-1"> {</h3> */}
         
          {/* price */}
          <div className="d-flex mb-1 w-100 justify-content-evenly align-items-center flex-wrap">
            <h2
              className="price w-100 p-0 m-0"
              style={{
                textDecoration: product?.priceAfterDiscount
                  ? "line-through"
                  : "none",
              }}
            >
              ({product?.price?.toFixed(2)})SAR
            </h2>
            {product?.priceAfterDiscount && (
              <h2 className="price text-success p-0 m-0">
                ({product?.priceAfterDiscount.toFixed(2)})SAR
              </h2>
            )}

            <span className="text-danger">(شامل ضريبة القيمة المضافة 15%)</span>
          </div>
          {/* {  product?.quantity.toFixed(0) > 0 ?<span className="text-dark fs-5">الكميه: ({ product?.quantity.toFixed(0)})</span>:
            <span className="text-dark fs-5">الكميه:متوفر عند الطلب</span>
          } */}
               <div className={`fw-bold fs-5 pt-2 d-flex align-items-center  justify-content-center ${reverse?'flex-row-reverse':''} `}>
                  <span className={`card-title ps-1 d-${ product?.quantity === 0?'none':''}`}>الكمية  </span>
                  <span className="text-secondary d-flex align-items-center ">
                      { product?.quantity> 0 ?`( ${product?.quantity.toFixed(0)} )`:''}

                  </span>                      
                    <span className={`text-danger  fs-6 ${showQuantity} `}>   كميه محدودة   </span>
                    <span className={`text-danger  fs-6 ${showQuantityMsg} `}>     يتوفر عند الطلب</span>
                </div>
          <button
            disabled={createLoding?true:false}
          style={{ whiteSpace: 'nowrap'}}
            onClick={() => addproducToCartOurWishlist(product?._id,'cart')}
            className="buy border-0"
          >
            <MdAddShoppingCart fontSize={'1.5rem'} className="mx-1" />

       {    createLoding? <span className=" spinner-border"></span>:' اضافه الى السلة'}
             
          </button>
        </Fade>
      </div>
             {/* share to social media */}
   


    </div>
  );
};

Card.propTypes = {
  imgePath: PropTypes.string,
  reverse: PropTypes.bool,
  product: PropTypes.object,
};
export default Card;
