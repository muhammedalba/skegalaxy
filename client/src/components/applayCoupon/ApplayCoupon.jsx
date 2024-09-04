import   React, { useEffect, useState } from 'react';
import { infoNotify, successNotify, warnNotify } from '../../utils/Toast';
import { useUpdateOneMutation } from '../../redux/features/api/apiSlice';
import { Fade } from 'react-awesome-reveal';
import PropTypes from "prop-types";

import { useSelector } from 'react-redux';

const ApplayCoupon = ({productsDetails,openPaymntCommpount,LoadingDelet,openModalAndClearCart,
Confirm ,HideDiscount}) => {
    const [updateOne,{ error: errorUpdate,isLoading: LoadingUpdate,isSuccess: successUpdate,data: updateData,},] = useUpdateOneMutation();
    const cartitems = useSelector((state) => state.cart);
    console.log(cartitems,'cartitems');
    
  const [coupon, setCoupon] = useState("");
 
  
  
  useEffect(() => {
    if (successUpdate) {
      successNotify("تم تحديث السعر بنجاح");
      HideDiscount(false);
    }
    if (errorUpdate) {
      if (errorUpdate.status === 404) {
        warnNotify("الرمز خطأ او منتهي الصلاحيه");
      }  else {
        warnNotify("خطا في الخادم المحلي");
      }
    }
  }, [errorUpdate, successUpdate, HideDiscount]);


  // handel coupon
  const handelcoupon = (e) => {
    e.preventDefault();
    if (coupon !== undefined && coupon !== "" && coupon.length >= 3) {
      // console.log(coupon,'NEWSsm1');
      updateOne({
        url: `/cart/applayCoupon`,
        method: "PUT",
        body: {
          coupon,
        },
      });
    } else {
      infoNotify("الرمز المدخل غير صحيح");
    }
  };




    return (
        <div
        className={
          productsDetails?.resnumOfCartItems > 0
            ? "col-12 col-sm-7 mx-auto col-lg-3  totale z-2"
            : "col-12 col-sm-6 mx-auto col-lg-3 totale"
        }
      >
        {/* coupon start*/}
        {/* {isSuccess && productsDetails?.resnumOfCartItems > 0 &&  */}
        <form
          style={{ backgroundColor: "var(--minColor)" }}
          className=" w-100 shadow-none pt-5 border-bottom p-2"
          onSubmit={handelcoupon}
        >
          <div className="form-group my-2">
            {/* <p className="m-0 fs-4 px-1">هل لديك كود خصم؟</p> */}
            <Fade direction="up" triggerOnce={true} cascade>
              <label className="fs-4 my-2  px-1 " htmlFor="couponInput ">
                هل لديك كود خصم؟
              </label>

              <div className="w-100 d-flex border border-1 gap-1">
                <input 
                  minLength={3}
                  onChange={(e) => setCoupon(e.target.value)}
                  type="text"
                  className="form-control  border-0 shadow-none"
                  id="couponInput"
                  placeholder="ادخل رمز القسيمة"
                  value={coupon}
                  required
                />
                <button
                  style={{ background: "var(--bgColor)" }}
                  disabled={
                    LoadingUpdate ||
                    
                    productsDetails?.resnumOfCartItems === 0
                  }
                  type="supmit "
                  className="btn rounded-0"
                >
                  التحقق
                </button>
              </div>
            </Fade>
          </div>
        </form>
        {/* coupon end */}
        {/* checkout start  && totale*/}
        <div
          style={{ backgroundColor: "var(--minColor)" }}
          className={
             productsDetails?.resnumOfCartItems > 0
              ? " w-100   d-flex p-2  align-items-center  flex-column gap-1"
              : "d-none"
          }
        >
          {updateData?.data?.totalPriceAfterDiscount && cartitems > 0 && Confirm    && (
            <Fade delay={0} direction="up" triggerOnce={true}>
              <span className="d-flex border-bottom flex-wrap py-3  justify-content-center  fs-5 ">
                المجموع قبل الخصم :
                <span className="ps-1 text-success text-decoration-line-through">
                  ({productsDetails?.totalCartPrice.toFixed(2)})SAR
                </span>
              </span>
            </Fade>
          )}

        
          <Fade delay={0} direction="up" triggerOnce={true}>
            <span className="  fs-5 py-3 ">
              المجموع : (
              {updateData?.data?.totalPriceAfterDiscount && Confirm
                ? updateData?.data?.totalPriceAfterDiscount?.toFixed(2)
                : productsDetails?.totalCartPrice?.toFixed(2)}
              ) <span className="ps-1 text-success">SAR</span>
            </span>
            <span className="text-danger text-center d-block">
              {" "}
              التوصيل مجانا داخل مدينة الرياض لاي طلب يتجاوز (6000) الاف ريال
            </span>
            <span className="text-primary text-center d-block">
              اجور التوصيل تختلف حسب المكان والكمية تواصل معنا لمعرفة تكلفة
              التوصيل
              <a className="d-block " href="tel:+966598909991">
                ( 966598909991+)
              </a>
              او يمكنك استلام طلبيتك من احد فروعنا
            </span>
          </Fade>

          {/* delet itims */}
          { productsDetails?.resnumOfCartItems > 0 && (
            <div className="d-flex align-items-center gap-2">
              <div className="">
                <Fade delay={0} direction="up" triggerOnce={true}>
                  <button
                    onClick={openPaymntCommpount}
                    disabled={
                      LoadingDelet  || LoadingUpdate
                        ? true
                        : false
                    }
                    className="btn btn-success "
                  >
                    {LoadingDelet  ? (
                      <span className="spinner-border"></span>
                    ) : (
                      "شراء"
                    )}
                  </button>
                </Fade>
              </div>
              <Fade delay={0} direction="up" triggerOnce={true}>
                <button
                  style={{ whiteSpace: "nowrap" }}
                  disabled={
                    LoadingUpdate ||
                    LoadingDelet ||
                     
                    productsDetails?.length <= 0
                  }
                  onClick={openModalAndClearCart}
                  className="btn btn-danger "
                >
                  {LoadingDelet  ? (
                    <span className="spinner-border"></span>
                  ) : (
                    "حذف الكل "
                  )}
                </button>
              </Fade>
            </div>
          )}
        </div>
        {/* checkout end */}
      </div>
      
    );
}
ApplayCoupon.propTypes = {
    productsDetails: PropTypes.any,
    openModalAndClearCart: PropTypes.func.isRequired,
    HideDiscount: PropTypes.func.isRequired,
    LoadingDelet: PropTypes.bool.isRequired,
    
Confirm : PropTypes.bool.isRequired,
    openPaymntCommpount: PropTypes.func,

  
  };

const MemoizedApplayCoupon = React.memo(ApplayCoupon)

export default MemoizedApplayCoupon;
