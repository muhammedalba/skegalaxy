import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { FcManager } from "react-icons/fc";

import { PiCity } from "react-icons/pi";

import { LiaCitySolid } from "react-icons/lia";
import { FaMountainCity } from "react-icons/fa6";
import { GiModernCity } from "react-icons/gi";
import { BsTelephoneFill } from "react-icons/bs";
import { BiMessageAltDetail } from "react-icons/bi";
import  React, { useCallback, useEffect, useRef, useState } from "react";
import { errorNotify, infoNotify, successNotify, warnNotify } from "../utils/Toast";
import { useDispatch } from "react-redux";
import { useCreateOneMutation } from "../redux/features/api/apiSlice";
import { cartitems } from "../redux/features/Slice/CartSlice";
import { validateFormData } from "../utils/validateFormData";
// imges
import iban from "../imges/ibanLatterEn.pdf";
import vizaImge from "../imges/viza-preview.webp";
import PropTypes from "prop-types";


const Payment = ({ display ,productsDetails,setdisplay}) => {

console.log(productsDetails);

    const [ CreateOne,{error: errorCreate,isLoading: LoadingCreate,isSuccess: successCreate,data: dataCreate,},] = useCreateOneMutation();
    const focus = useRef(null);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [Company, setCompany] = useState(false);
    const [VizaCard, setVizaCard] = useState(false);

    const [shippingAddress, setshippingAddress] = useState({
        title: "",
        detalis: "",
        Taxnumber: "",
        postalCode: "",
        phone: "",
        city: "",
        Area: "",
        country: "المملكة العربية السعودية",
        street: "",
      });
  // Link to go to the payment page
  const PaymentPage = dataCreate?.data?.url;



      console.log(errorCreate);
    //   console.log(productsDetails);
    useEffect(() => {
        if (display) {
          focus.current.focus();
        }
      }, [display]);

      
      useEffect(() => {
        if ( successCreate) {
          dispatch(cartitems(0)) 
          setdisplay(false);
          successNotify("تم طلب العنصر بنجاح");
          VizaCard && window.open(PaymentPage, "_blank");
          window.location.pathname='/';
   

         
        }
    
       
      }, [PaymentPage, VizaCard, dispatch, setdisplay, successCreate]);


      useEffect(() => {
        if (errorCreate) {
            errorNotify(errorCreate.status === 500 ? "خطا في الخادم المحلي" : "حدث خطأ ما");
              setdisplay(false);
            }
      }, [display, errorCreate, setdisplay]);


  // handle Image Change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

// handel Create Order
    const handelCreateOrder = (e) => {
    e.preventDefault();

    // Validate the form data
    const formErrors = validateFormData(shippingAddress, Company,image);
    formErrors.phone &&
      setshippingAddress({ ...shippingAddress, phone: formErrors.phone });

    if (Object.keys(formErrors.errors).length > 0) {
      // Handle the errors (e.g., set error state, display error messages)

      Object.values(formErrors.errors).forEach((error, i) => {
        infoNotify(` ${i + 1}: ${error}`);
      });

      return;
    }
   if(!image){
     warnNotify("الرجاء ارسال صورة الوصل");
     return;
   }
    // Send data to backend if valid
    if (
      productsDetails?.resnumOfCartItems > 0 &&
      Object.keys(formErrors.errors).length === 0
    ) {
      const cartId = productsDetails.id;
      const form = new FormData();
      Object.keys(shippingAddress).forEach((key) =>
        form.append(key, shippingAddress[key])
      );

      if (image) form.append("image", image);
      // create order
      CreateOne({
        url: `/orders/${cartId}`,
        method: "post",
        body: form,
      });
    } else {
      infoNotify("لايوجد منتجات في السلة");
    }
  };

  // handelcheckoutSession
  const handelcheckoutSession = (e) => {
    e.preventDefault();
    setVizaCard(true);
 
    
    // Validate the form data
    const formErrors = validateFormData(shippingAddress, Company);
    formErrors.phone &&
      setshippingAddress({ ...shippingAddress, phone: formErrors.phone });

    if (Object.keys(formErrors.errors).length > 0) {
      // Handle the errors (e.g., set error state, display error messages)

      Object.values(formErrors.errors).forEach((error, i) => {
        infoNotify(` ${i + 1}: ${error}`);
      });

      return;
    }

    // Send data to backend if valid
    if (
      productsDetails?.resnumOfCartItems > 0 &&
      Object.keys(formErrors.errors).length === 0
    ) {
      const cartId = productsDetails.id;
      // create order
    //   CreateOne({
    //     url: `/orders/checkout-session/${cartId}`,
    //     method: "post",
    //     body: { shippingAddress },
    //   });
    } else {
      infoNotify("لايوجد منتجات في السلة");
    }
  };
  // handle Purchase Change
  const handleshippingAddress = useCallback(
    (e) => setshippingAddress((prev) => ({ ...prev, [e.target.id]: e.target.value })),
    []
  );

  return (
    <div className={`p-1 w-100 ${display ? "d-block" : "d-none"}`} style={{ position: "absolute", minHeight: "100%", backgroundColor: "#0a0a0ab0", top: "0", right: "0", zIndex: 1005 }}>

      <form
        className="m-auto col-11 col-md-10 col-lg-9 p-3 rounded-4 mt-5 "
        style={{
          backgroundColor: "var(--bgColor)",
          color: "var(--text-color)",
       
        }}
      >
       
        <p className="w-100 fs-4 p-2 text-center border-bottom ">
          معلومات الدفع ولاستلام
       
        </p>
        <div className="col-sm-12 py-2">
          <div className="row">
          {/* iban && campane name srt*/}
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"iban"}
              >
                <MdOutlineLocalPostOffice />
                اسم صاحب الحساب
              </label>
              <input
                disabled
                className="form-control"
                id={"iban"}
                name={"iban"}
                type={"text"}
                placeholder={" اسم صاحب الحساب"}
                value={"شركة مجرة السماء للتجارة"}
              />
            </div>
            <div  className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"iban"}
              >
                <MdOutlineLocalPostOffice />
                رقم الحساب -الايبان
              </label>
              <input
                disabled
                className="form-control"
                id={"iban"}
                name={"iban"}
                type={"text"}
                placeholder={"   رقم الحساب -الايبان"}
                value={"289000010006089786591"}
              />
            </div>
            {/* iban end*/}
            <div className="col-sm-12 p-2">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"iban"}
              >
                <MdOutlineLocalPostOffice />
                رقم الحساب الدولي -الايبان
              </label>
              <input
                disabled
                className="form-control"
                id={"iban"}
                name={"iban"}
                type={"text"}
                placeholder={"   رقم الحساب -الايبان"}
                value={"SA2180000289608019786591"}
              />
            </div>
            {/* imge input */}
            <div className="col-md-12 py-2">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor="image"
              >
              صورة وصل التحويل 
             <i  className="text-danger"> (مطلوب عند الدفع كحواله)</i>
              </label>
              <input
                required
                className="form-control"
                id="image"
                name="image"
                type="file"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        {/* title Customer */}
        <div className="col-sm-12 py-2">
          <div className="row">
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"Customer"}
              >
                {Company ? <FcDepartment /> : <FcManager />}
                صفه المستلم
              </label>
              <select
                ref={focus}
                disabled={LoadingCreate}
                className="form-select  py-2"
                onChange={() => setCompany(!Company)}
                id="Customer"
                name="Customer"
                value={Company}
                aria-label="Default select example"
              >
                <option value="" disabled>
                  صفه المستلم
                </option>
                <option value="false">زبون</option>
                <option value="true">شركه</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"title"}
              >
                {Company ? <FcDepartment /> : <FcManager />}
                {Company ? "اسم الشركه" : "   اسم المستلم الكامل"}
              </label>
              <input
                maxLength={40}
                minLength={3}
                required
                onChange={handleshippingAddress}
                className="form-control"
                id={"title"}
                name={"title"}
                type={"text"}
                placeholder={!Company ? "اسم المستلم " : "اسم الشركه"}
                value={shippingAddress.title}
              />
            </div>
          </div>
        </div>

        {/*  Taxnumber zip code */}
        <div
          style={{ display: Company ? "block " : "none" }}
          className="col-sm-12 py-2"
        >
          <div className="row">
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"postalCode"}
              >
                <MdOutlineLocalPostOffice />
                الرمز البريدي
              </label>
              <input
                required={Company}
                min={5}
                max={99999}
                className="form-control"
                id={"postalCode"}
                name={"postalCode"}
                type={"number"}
                placeholder={"الرمز البريدي"}
                value={shippingAddress.postalCode}
                onChange={handleshippingAddress}
              />
            </div>
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"Taxnumber"}
              >
                <MdOutlineLocalPostOffice />
                الرقم الضريبي
              </label>
              <input
                max={999999999999999}
                min={0}
                className="form-control"
                id={"Taxnumber"}
                name={"Taxnumber"}
                type={"number"}
                placeholder={"الرقم الضريبي"}
                value={shippingAddress.Taxnumber}
                required={Company}
                onChange={handleshippingAddress}
              />
            </div>
          </div>
        </div>
        {/* country  city Area  The street*/}
        <div className="col-md-12 py-2">
          <div className="row">
            {/* country */}
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"country"}
              >
                <PiCity />
                البلد
              </label>
              <input
                disabled
                className="form-control"
                id={"country"}
                name={"country"}
                type={"text"}
                placeholder={"ادخل اسم البلد   "}
                value={shippingAddress.country}
              />
            </div>
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"city"}
              >
                <LiaCitySolid />
                المدينه
              </label>
              <input
                maxLength={25}
                minLength={3}
                required
                onChange={handleshippingAddress}
                className="form-control"
                id={"city"}
                name={"city"}
                type={"text"}
                placeholder={" المدينه"}
                value={shippingAddress.city}
              />
            </div>
            {/* Area */}
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"Area"}
              >
                <FaMountainCity />
                المنطقه
              </label>
              <input
                maxLength={25}
                minLength={3}
                required
                className="form-control"
                id={"Area"}
                name={"Area"}
                type={"text"}
                placeholder={"المنطقه"}
                defaultValue={shippingAddress.Area}
                onChange={handleshippingAddress}
              />
            </div>
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"street"}
              >
                <GiModernCity />
                الشارع
              </label>
              <input
                maxLength={50}
                minLength={3}
                className="form-control"
                id={"street"}
                name={"street"}
                type={"text"}
                placeholder={"  الشارع"}
                value={shippingAddress.street}
                required
                onChange={handleshippingAddress}
              />
            </div>
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"detalis"}
              >
                <BiMessageAltDetail />
                معلومات مكان التسليم
              </label>

              <textarea
                className="form-control"
                id={"detalis"}
                name={"detalis"}
                type={"text"}
                placeholder={"   معلومات مكان التسليم"}
                value={shippingAddress.detalis}
                onChange={handleshippingAddress}
                rows="8"
                maxLength={2000}
                minLength={5}
                style={{ maxHeight: 170 }}
              />
            </div>
            {/* phone */}
            <div className="col-sm-6">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor={"phone"}
              >
                <BsTelephoneFill />
                رقم هاتف يبدأ (966+)
              </label>
              <input
                className="form-control"
                id={"phone"}
                name={"phone"}
                type="tel"
                placeholder={"+966   رقم الهاتف"}
                value={shippingAddress.phone}
                required
                onChange={handleshippingAddress}
              />

              <img
                className="w-50 my-2 m-auto d-block"
                src={vizaImge}
                alt="viza"
              />
            </div>
          </div>
        </div>
        {/* buttons start*/}
        <div className=" d-flex align-items-center justify-content-between flex-wrap gap-1">
          <button
            disabled={ LoadingCreate}
            onClick={handelCreateOrder}
            type="submit"
            className="btn btn-success"
          >
            دفع عن طريق حوالة
          </button>
          <button
            disabled
            onClick={handelcheckoutSession}
            type="button"
            className="btn btn-success"
          >
            دفع باستخدام بطاقة الكترونيه
          </button>
          <button
            disabled={ LoadingCreate }
            type="button"
            className="btn btn-primary"
          >
            <a
              className="text-white"
              href={iban}
              id="Download"
              download={'download'}
            >
             
              تنزيل شهادة ايبان
            </a>
          </button>
          <span
            onClick={useCallback(() => {
              setdisplay(false);
            }, [setdisplay])}
            disabled={LoadingCreate ? true : false}
            className="btn btn-danger my-4 d-flex align-items-center"
          >
            {LoadingCreate ? (
              <span className="spinner-border"></span>
            ) : (
              <span className="">الغاء</span>
            )}
          </span>
        </div>
        {/* buttons start*/}
      </form>
    </div>
  );
};
Payment.propTypes = {
    display : PropTypes.bool,
    productsDetails: PropTypes.any,
    setdisplay: PropTypes.func,
    
  
  };

const MemoizedPayment =React.memo(Payment);

export default MemoizedPayment;
