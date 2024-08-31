import "./cart.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import iban from '../../imges/ibanLatterAr.pdf'
import vizaImge from "../../imges/viza-preview.webp";
import { useDispatch } from "react-redux";
import {
  useCreateOneMutation,
  useDeletOneMutation,
  useGetDataQuery,
  useUpdateOneMutation,
} from "../../redux/features/api/apiSlice";
import { cartitems } from "../../redux/features/Slice/CartSlice";
import { ToastContainer } from "react-toastify";
import {
  errorNotify,
  infoNotify,
  successNotify,
  warnNotify,
} from "../../utils/Toast";
// Icons

import { SkeletonTeble } from "../../utils/skeleton";
import { validateFormData } from "../../utils/validateFormData";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FcDepartment } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { PiCity } from "react-icons/pi";
import { LiaCitySolid } from "react-icons/lia";
import { FaMountainCity } from "react-icons/fa6";
import { GiModernCity } from "react-icons/gi";
import { BsTelephoneFill } from "react-icons/bs";
import { BiMessageAltDetail } from "react-icons/bi";
import { IoAddOutline } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import { Fade } from "react-awesome-reveal";

const Cart = () => {
  const dispatch = useDispatch();

  // API Queries and Mutations
  const {
    data: products,
   error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(`cart`);
console.log(products);


  const [
    deletOne,
    { error: errorDelete, isLoading: LoadingDelet, isSuccess: successDelete },
  ] = useDeletOneMutation();
console.log(errorDelete);
  const [
    updateOne,
    {
      error: errorUpdate,
      isLoading: LoadingUpdate,
      isSuccess: successUpdate,
      data: updateData,
    },
  ] = useUpdateOneMutation();

  const [
    CreateOne,
    {
      error: errorCreate,
      isLoading: LoadingCreate,
      isSuccess: successCreate,
      data: dataCreate,
    },
  ] = useCreateOneMutation();

  // State Management
  // Recipient Description
  const [Company, setCompany] = useState(false);
  const [image, setImage] = useState(null);
   // handle Image Change
   const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setImage(file);
    }
};








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

  const [coupon, setCoupon] = useState("");
  // Delete all products
  const [RemoveCart, setRemoveCart] = useState(false);
  // Show purchase form
  const [display, setdisplay] = useState(false);
  const [VizaCard, setVizaCard] = useState(false);
  const [Confirm, setConfirm] = useState(false);
  const focus = useRef(null);
  const [productsDetails, setProductsDetails] = useState({
    id: "",
    resnumOfCartItems: 0,
    totalCartPrice: 0,
    cartItems: [],
    imageUrl: "",
  });
 
console.log(errorUpdate);

  // Effect for handling deletion success
  useEffect(() => {
    if (successDelete) {
      !RemoveCart && successNotify("تم حذف العنصر بنجاح");
      if (RemoveCart) {
        dispatch(cartitems(0));
        successNotify("تم حذف كل العناصر بنجاح");
      }
    }
    if (errorDelete) {
      errorNotify("خطأ في الخادم");
    }
  }, [RemoveCart, dispatch, errorDelete, successDelete]);

  useEffect(() => {
    if (display) {
      focus.current.focus();
    }
  }, [display]);

  useEffect(() => {
    if(error?.status ===401){
      warnNotify('انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا')
    }
  },[error?.status])

  // Effect for handling product data retrieval
  useEffect(() => {
    if (isSuccess && !isLoading && !successCreate) {
      const { _id, totalCartPrice, cartItems } = products.data;
      dispatch(cartitems(products.resnumOfCartItems));
      setProductsDetails({
        id: _id,
        totalCartPrice,
        cartItems,
        resnumOfCartItems: products?.resnumOfCartItems,
        imageUrl: products?.imageUrl,
      });
    }
  }, [
    dispatch,
    display,
    isLoading,
    isSuccess,
    products?.data,
    products?.imageUrl,
    products?.resnumOfCartItems,
    successCreate,
  ]);
// Link to go to the payment page
  const PaymentPage = dataCreate?.data?.url;

  //handel success Create order our error message
  useEffect(() => {
    if (!LoadingCreate && successCreate) {
      dispatch(cartitems(0));
      successNotify("تم طلب العنصر بنجاح");
      setdisplay(false);
      VizaCard && window.open(PaymentPage, "_blank");
    }

    if (errorCreate) {
      if (errorCreate.status === 500) errorNotify("خطا في الخادم المحلي");
      setdisplay(false);
    }
  }, [
    LoadingCreate,
    PaymentPage,
    VizaCard,
    dispatch,
    errorCreate,
    successCreate,
  ]);
  useEffect(() => {
    if (successUpdate) {
      successNotify("تم تحديث العنصر بنجاح");
    }
    if (errorUpdate) {
      if (errorUpdate.status === 404) {
        warnNotify("الرمز خطأ او منتهي الصلاحيه");
      }else if (errorUpdate.status === 400) {
        warnNotify("هذه الكميه غير متوفرة حاليا");
      }
      else {
        warnNotify("خطا في الخادم المحلي");
      }
    }
  }, [errorUpdate, successUpdate]);

  

  // handle Purchase Change
  const handleshippingAddress = (e) => {
    e.preventDefault();
    setshippingAddress({ ...shippingAddress, [e.target.id]: e.target.value });
  };

  // Handle Increase and Decrease Quantity
  const handleQuantityChange = useCallback((index, increment,inputValue) => {
    // show Confirm button
    setConfirm(true);

    setProductsDetails((prevDetails) => {
      const newCartItems = prevDetails.cartItems.map((item, i) => {
        if (i === index) {
          let newQuantity;
          !inputValue? newQuantity = +item.quantity + +increment:newQuantity = +increment
          console.log(newQuantity);
          
          return { ...item, quantity: Math.max(newQuantity, 1) };
        }
        return item;
      });

      return { ...prevDetails, cartItems: newCartItems };
    });
  }, []);

  // Handle Quantity Update to Server
  const handelQuantity = useCallback(
    (itemId, quantity,productId) => {
      setConfirm(false);
      
      if (quantity > 0) {
        updateOne({
          url: `/cart/${itemId}`,
          method: "PUT",
          body: { quantity , productId },
        }); 
      } else {
        warnNotify("لا يمكن أن تكون الكمية أقل من 1");
      }
    },
    [updateOne]
  );

  // Handle Product Deletion
  const handelDelet = useCallback(
    (productId) => {
      if (confirm("هل انت متاكد بانك تريد حذف هذا العنصر")) {
        deletOne(`cart/${productId}`);
      }
    },
    [deletOne]
  );

  // Clear Cart
  const clearCart = useCallback(() => {
    if (confirm("هل انت متاكد بانك تريد مسح كافة العناصر من السلة")) {
      deletOne(`/cart`);
      setProductsDetails([]);
      setRemoveCart(true);
    }
  }, [deletOne]);

  // Show Product Data
  const showData = useMemo(() => {
    if (isLoading) {
      return SkeletonTeble;
    }
    if (isSuccess && productsDetails?.resnumOfCartItems > 0) {
      return productsDetails.cartItems.map((product, index) => (
        <tr key={index}>{
        }
          <td className=" d-table-cell" scope="row">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <button
                disabled={LoadingDelet || LoadingUpdate}
                onClick={() => handelDelet(product?._id)}
                className="btn border-0 text-danger fs-3"
              >
                {LoadingDelet || LoadingCreate ? (
                  <span className="spinner-border"></span>
                ) : (
                  <IoCloseOutline />
                )}
              </button>
            </Fade>
          </td>
          <td className="d-sm-table-cell">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <img
                style={{ width: "100px", height: "80px" }}
                src={`${products?.imageUrl}/${product?.product?.imageCover}`}
                alt="product"
              />
            </Fade>
          </td>
          <td className="d-none d-sm-table-cell text-end">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <div className="d-flex flex-column w-100 h-100">
                {product.product ? product.product?.title?.slice(0, 50):<span className="text-danger"> هذا المنتج غير متوفر حاليا</span>}
                <span
                  className={`${
                    product?.product?.priceAfterDiscount
                      ? "text-danger text-decoration-line-through"
                      : "text-danger "
                  }`}
                >
                  ({product?.product?.price} )
                  <i className="text-success"> SAR</i>
                </span>
                <span className="py-2 text-danger">
                  ({product?.product?.priceAfterDiscount} )
                  <i className="text-success"> SAR</i>
                </span>
                <span className=" text-danger">
                  <i className="text-dark">  الكمية المتوفرة :</i>
                  ({product?.product?.quantity} )
                </span>
              </div>
            </Fade>
          </td>
          <td className="d-table-cell">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <div className="w-100 d-flex align-items-center gap-1 justify-content-between">
                <IoAddOutline
                  cursor={"pointer"}
                  fontSize={"25px"}
                  color="blue"
                  onClick={() => handleQuantityChange(index, 1)}
                />
                <input min={1} 
                max={2000}
                  style={{width:'5rem'}}
                  onChange={(e) => handleQuantityChange(index, e.target.value,true)}
                  type="number"
                  className="form-control  border-1  text-center bg-transparent"
                  id="quantity"
                  placeholder={productsDetails.cartItems[index].quantity}
                  value={productsDetails.cartItems[index].quantity}
                   name="quantity"  />
                
                <RiSubtractLine
                  cursor={"pointer"}
                  fontSize={"25px"}
                  color="red"
                  onClick={() => handleQuantityChange(index, -1)}
                />
                {(
                  <button
                    type="button"
                    disabled={
                      LoadingDelet || LoadingCreate || LoadingUpdate
                        ? true
                        : false
                    }
                    className={Confirm?"btn  m-0 border-0 p-0 text-success":'d-none'}
                    onClick={() =>
                      handelQuantity(
                        product?._id,
                        productsDetails?.cartItems[index].quantity,
                         product?.product?._id
                      )
                    }
                  >
                    تاكيد
                    <BsCheck2 fontSize={"25px"} />
                  </button>
                )}
              </div>
            </Fade>
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td
            className="text-center p-3 fs-5 text-primary"
            colSpan={7}
            scope="row"
          >
            السلة فارغه
          </td>
        </tr>
      );
    }
  }, [isLoading, isSuccess, productsDetails?.resnumOfCartItems, productsDetails?.cartItems, LoadingDelet, LoadingUpdate, LoadingCreate, products?.imageUrl, Confirm, handelDelet, handleQuantityChange, handelQuantity]);

  // handel Create Order
  const handelCreateOrder = (e) => {
    e.preventDefault();

    // Validate the form data
    const formErrors = validateFormData(shippingAddress, Company);
    formErrors.phone && setshippingAddress({ ...shippingAddress, phone: formErrors.phone })
      ;

    if (Object.keys(formErrors.errors).length > 0) {
      // Handle the errors (e.g., set error state, display error messages)

      Object.values(formErrors.errors).forEach((error, i) => {
        infoNotify(` ${i + 1}: ${error}`);
      });

      return;
    }
    if (image===null){
      warnNotify(' الرجاء ارسال صورة الوصل')
      return;
    }
    // Send data to backend if valid
    if (
      productsDetails?.resnumOfCartItems > 0 &&
      Object.keys(formErrors.errors).length === 0
    ) {
      const cartId = productsDetails.id;
      const form = new FormData();
          Object.keys(shippingAddress).forEach((key) => form.append(key, shippingAddress[key]));
         
          if (image) form.append("image", image);
      // create order
      CreateOne({
        url: `/orders/${cartId}`,
        method: "post",
        body:  form ,
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
      CreateOne({
        url: `/orders/checkout-session/${cartId}`,
        method: "post",
        body: { shippingAddress },
      });
    } else {
      infoNotify("لايوجد منتجات في السلة");
    }
  };
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
    <div className="container-fluid pt-5  ">
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
        {/* products results && table &&coupon */}
      <div className="row flex-row-reverse ">
        {/* products results && table */}
        <div className="col-12 col-lg-9 border-end flex">
          <Fade delay={0} direction="up" triggerOnce={true}>
            <h1 className="text-center m-3 py-3 border-bottom">سلة مشترياتي </h1>
          </Fade>

          {/* products results */}

          {isSuccess && productsDetails?.resnumOfCartItems > 0 && (
            <Fade delay={0} direction="up" triggerOnce={true}>
              <span className="fs-5 p-2">
                عدد المنتجات : ( {productsDetails?.resnumOfCartItems} )
              </span>
            </Fade>
          )}

          {/* data table  start*/}
          <table className="table table-striped pt-5 mt-3 text-center">
            <thead>
              <tr>
                <th className=" d-table-cell" scope="col">
                  حذف
                </th>
                <th className="d-table-cell" scope="col">
                  صورة المنتج
                </th>
                <th className="d-none d-sm-table-cell" scope="col">
                  الاسم المنتج
                </th>
                <th className=" d-table-cell" scope="col">
                  العدد
                </th>
              </tr>
            </thead>
            <tbody className="">{showData}</tbody>
          </table>
          {/* data table  end*/}
        </div>

        {/* coupon and checkout start*/}
        <div className={productsDetails?.resnumOfCartItems>0?"col-12 col-sm-7 mx-auto col-lg-3  totale z-2":"col-12 col-sm-6 mx-auto col-lg-3 totale"}>
          {/* coupon start*/}
          {/* {isSuccess && productsDetails?.resnumOfCartItems > 0 &&  */}
          <form
          style={{backgroundColor:'var(--minColor)'}}
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
                style={{ background:'var(--bgColor)'}}
                  disabled={
                    LoadingUpdate ||
                    LoadingCreate ||
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
          <div   style={{backgroundColor:'var(--minColor)'}} className= {isSuccess && productsDetails?.resnumOfCartItems > 0 ?" w-100   d-flex p-2  align-items-center  flex-column gap-1":'d-none'}>
            {updateData?.data?.totalPriceAfterDiscount && !display && (
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
                {!updateData?.data?.totalPriceAfterDiscount
                  ? productsDetails?.totalCartPrice?.toFixed(2)
                  : updateData?.data?.totalPriceAfterDiscount?.toFixed(2)}
                ) <span className="ps-1 text-success">SAR</span>
              </span>
              <span className="text-danger text-center d-block">  التوصيل مجانا داخل مدينة الرياض لاي طلب يتجاوز  (6000) الاف ريال</span>
              <span className="text-primary text-center d-block">اجور التوصيل تختلف حسب المكان والكمية تواصل  معنا لمعرفة تكلفة التوصيل 
              <a className="d-block " href="tel:+966598909991" >
               ( 966598909991+)
                </a>
                او يمكنك استلام طلبيتك من احد فروعنا         
              </span>
            </Fade>
           
            {/* delet itims */}
            {isSuccess && productsDetails?.resnumOfCartItems > 0 && (
              <div className="d-flex align-items-center gap-2">
                <div className="">
                  <Fade delay={0} direction="up" triggerOnce={true}>
                    <button
                      onClick={() => setdisplay(true)}
                      disabled={
                        LoadingDelet || LoadingCreate || LoadingUpdate
                          ? true
                          : false
                      }
                      className="btn btn-primary "
                    >
                      {LoadingDelet || LoadingCreate ? (
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
                      LoadingCreate ||
                      productsDetails?.length <= 0
                    }
                    onClick={clearCart}
                    className="btn btn-danger "
                  >
                    {LoadingDelet || LoadingCreate ? (
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
       
      </div>

      {/* order form start */}
      <div
        className="p-1 w-100  "
        style={{
          position: "absolute",
          minHeight: "100%",
          backgroundColor: "#0a0a0ab0",
          display: display ? "block" : "none",
          top: " 0",
          right: "0",
          zIndex: 1000,
        }}
      >
        <form className="m-auto col-11 col-md-10 col-lg-9 p-3 rounded-4 mt-5 "
          style={{
            backgroundColor: "var(--bgColor)",
            color: "var(--text-color)",
          }}
         
         
        >
          <p className="w-100 fs-4  text-center border-bottom ">
            معلومات الدفع ولاستلام
          </p>
          <div
       
            className="col-sm-12 py-2"
          >
            <div className="row">
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
              <div className="col-sm-6">
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
                  value={'289000010006089786591'}
                 
                
                />
              </div>
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
                  value={'SA2180000289608019786591'}
                 
                
                />
              </div>
              {/* imge input */}
            <div className="col-md-12 py-2">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor="image"
              >
                 صورة وصل التحويل
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
                  disabled={isLoading}
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

                <img className="w-50 my-2 m-auto d-block" src={vizaImge} alt="viza" />
              </div>
            </div>
          </div>
          {/* buttons start*/}
          <div className=" d-flex align-items-center justify-content-between flex-wrap gap-1">
            <button
              disabled={isLoading || LoadingCreate ? true : false}
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
              disabled={isLoading || LoadingCreate ? true : false}
              
              type="button"
              className="btn btn-primary"
            >
            <a className="text-white" href={iban} id='Download' download={"muhammed.pdf"}> تنزيل شهادة ايبان </a>
              
            </button>
            <span
              onClick={useCallback(() => {
                setdisplay(false);
              }, [])}
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
      {/* order form end */}
    </div>
  );
};

export default Cart;
