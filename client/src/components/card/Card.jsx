import "./card.css";
import React, { Suspense, useCallback, useEffect, useState } from "react";



const Rating = React.lazy(() => import("../Rating/Rating"));
import { PiEyeThin } from "react-icons/pi";
import { Fade } from "react-awesome-reveal";

import PropTypes from "prop-types";
import { useCreateOneMutation } from "../../redux/features/api/apiSlice";
import { CiHeart } from "react-icons/ci";

import { successNotify, warnNotify } from "../../utils/Toast";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { cartitems } from "../../redux/features/Slice/CartSlice";
import { Link } from "react-router-dom";
import { IoShareSocial } from "react-icons/io5";
import { SlSocialInstagram } from "react-icons/sl";
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
  if(successCreeate){
    successNotify('تم اضافه المنتج بنجاح ')
  
  }
},[successCreeate])



  useEffect(()=>{

    if( crerateData?.status ===201  ){
      // Update the number of items in the shopping cart
         dispatch(cartitems(crerateData?.resnumOfCartItems)) 
        successNotify('تم اضافه المنتج بنجاح ')
     
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
    if (token && typeof(productId) !== "undefined"&& !displed) {
      
      
      createOne({
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


  return (
    <div className="card-product m-auto ">

   
      <IoShareSocial style={{ top: "4rem" }} className="cart-icon mx-2" onClick={showIcons} />
      <CiHeart onClick={() => addproducToCartOurWishlist(product?._id,'wishlist')}  style={{ top: "1rem",left:'auto'}} className="cart-icon-Heart mx-2 start-0 " />
      <Link to={`/products/${product?._id}`}>
      <PiEyeThin style={{ top: "1rem" }} className="cart-icon mx-2 " />
    
     
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

            <SlSocialInstagram  color="white" fontSize={"1.23rem"}/>
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
          <h3 className="my-1"> {product?.title?.slice(0, 25)} </h3>
         
          {/* price */}
          <div className="d-flex mb-1 w-100 justify-content-evenly align-items-center flex-wrap">
            <h2
              className="price p-0 m-0"
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
