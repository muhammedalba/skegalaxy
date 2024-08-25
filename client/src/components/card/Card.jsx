import "./card.css";

import Rating from "../Rating/Rating";

import { PiEyeThin } from "react-icons/pi";
import { Fade } from "react-awesome-reveal";

import PropTypes from "prop-types";
import { useCreateOneMutation } from "../../redux/features/api/apiSlice";
import { useCallback, useEffect, useState } from "react";

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

const Card = ({ product, imgePath }) => {


  

// add product to cart
  const [
    createOne,
    { error: createError, isLoading: createLoding ,data:crerateData},
  ] = useCreateOneMutation();




  const dispatch = useDispatch();


  useEffect(()=>{

    if( crerateData?.status ===201  ){
      // Update the number of items in the shopping cart
         dispatch(cartitems(crerateData?.resnumOfCartItems)) 
        successNotify('تم اضافه المنتج بنجاح ')
 
 }
 

 if(  createError?.status == 401 ){
     
   warnNotify("يجب عليك تسجيل دخول اولا");

 }
 if(  createError?.status == 400 ){
     
  warnNotify("هذه الكميه غير موجوده حاليا");

}

},[createError?.status, crerateData?.resnumOfCartItems, crerateData?.status, dispatch])

const [display ,setDisplay]=useState(false);
const cokkies = new Cookies();
const token = cokkies.get("token");
const shareUrl = window.location.href; // URL الصفحة الحالية
const title =  "   شركه مجرة السماء! للتجارة"; // العنوان للمشاركة

  const addToCart = useCallback((productId) => {
    // تحقق من أن المستخدم مسجل الدخول وأن معرف المنتج صالح
    if (token && typeof(productId) !== "undefined") {
      createOne({
        url: "cart",
        method: "POST",
        body: { productId },
      })

    } else {
      warnNotify("يجب عليك تسجيل دخول اولا");
      console.log("login");
    }
  }, [createOne, token]);


 const showIcons=()=>{
  setDisplay(!display)
 }
  return (
    <div className="card-product m-auto ">
   
      <IoShareSocial style={{ top: "4rem" }} className="cart-icon " onClick={showIcons} />
      <Link to={`/products/${product.id}`}>
      <PiEyeThin style={{ top: "1rem" }} className="cart-icon " />
     
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
          <Rating ratingsAverage={product?.ratingsAverage || 3} />
          <h3 className="my-1"> {product?.title?.slice(0, 15)}</h3>
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

            <span className="text-danger">(شامل الضريبه المضافه)</span>
          </div>

          <button
            disabled={createLoding?true:false}
          
            onClick={() => addToCart(product.id)}
            className="buy border-0"
          >
       {    createLoding? <span className=" spinner-border"></span>:' اضافه للسله'}
             
          </button>
        </Fade>
      </div>
             {/* share to social media */}
   


    </div>
  );
};

Card.propTypes = {
  imgePath: PropTypes.string,
  product: PropTypes.object,
};
export default Card;
