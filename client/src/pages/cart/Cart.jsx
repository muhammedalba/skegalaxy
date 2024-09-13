import React, { memo, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import "./cart.css";
import { useDispatch } from "react-redux";
import {

  useDeletOneMutation,
  useGetDataQuery,
  useUpdateOneMutation,
} from "../../redux/features/api/apiSlice";
import { cartitems } from "../../redux/features/Slice/CartSlice";
import { Fade } from "react-awesome-reveal";
import Cookies from "universal-cookie";

// cammpounts
import { ToastContainer } from "react-toastify";
import {
  errorNotify,
  successNotify,
  warnNotify,
} from "../../utils/Toast";
import { SkeletonTeble } from "../../utils/skeleton";

import DeleteModal from "../../components/deletModal/DeleteModal";

// Icons
import { IoCloseOutline } from "react-icons/io5";

import { IoAddOutline } from "react-icons/io5";
import { RiSubtractLine } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import { Link } from "react-router-dom";

const MemoizedPayment = React.lazy(() => import("../../components/Payment"));
const MemoizedApplayCoupon = React.lazy(() => import("../../components/applayCoupon/ApplayCoupon"));






const Cart =() => {
  const dispatch = useDispatch();

  // API Queries and Mutations
  const {data: products,error,isLoading,isSuccess,} = useGetDataQuery(`cart`);
 
  const [ deletOne,{ error: errorDelete, isLoading: LoadingDelet, isSuccess: successDelete },] = useDeletOneMutation();
  
  const [updateOne,{ error: errorUpdate,isLoading: LoadingUpdate,isSuccess: successUpdate},] = useUpdateOneMutation();



  // State Management
  // Recipient Description
  const cookies = new Cookies();


console.log(products);

  
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showModal, setShowModal] = useState(false);
    const [clearAll, setClearAll] = useState(false);

  // Delete all products
  const [RemoveCart, setRemoveCart] = useState(false);
  // Show purchase form
  const [display, setdisplay] = useState(false);
  const [displayDiscount, setdisplayDiscount] = useState(false);

  const [Confirm, setConfirm] = useState(false);


  
  const [productsDetails, setProductsDetails] = useState({
    id: "",
    resnumOfCartItems: 0,
    totalCartPrice: 0,
    cartItems: [],
    imageUrl: "",
  });


  const token = cookies.get("token");
  console.log(errorUpdate);

// Delete all products
const openModalAndClearCart = useCallback(() => {
  setClearAll(true);

  setShowModal(true);
}, []);




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
    if (error?.status === 401 && token) {
      warnNotify("انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا");
    }
  }, [error?.status, token]);

  // Effect for handling product data retrieval
  useEffect(() => {
    if (isSuccess && !isLoading ) {
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
  }, [dispatch, display, isLoading, isSuccess, products?.data, products?.imageUrl, products?.resnumOfCartItems]);


  //handel success Create order our error message
 
  useEffect(() => {
    if (successUpdate) {
      successNotify("تم تحديث العنصر بنجاح");
    }
    if (errorUpdate) {
       if (errorUpdate.status === 400) {
        warnNotify("هذه الكميه غير متوفرة حاليا");
      } else {
        warnNotify("خطا في الخادم المحلي");
      }
    }
  }, [errorUpdate, successUpdate]);


  // Handle Increase and Decrease Quantity
  const handleQuantityChange = useCallback((index, increment, inputValue) => {
    // show Confirm button
    setConfirm(true);
  
    setProductsDetails((prevDetails) => {
      const newCartItems = prevDetails.cartItems.map((item, i) => {
        if (i === index) {
          let newQuantity;
          !inputValue
            ? (newQuantity = +item.quantity + +increment)
            : (newQuantity = +increment);
          return { ...item, quantity: Math.max(newQuantity, 1) };
        }
        return item;
      });

      return { ...prevDetails, cartItems: newCartItems };
    });
  }, []);

  // Handle Quantity Update to Server
  const handelQuantity = useCallback(
   
    (itemId, quantity, productId) => {
      setdisplayDiscount(false)

      if (quantity > 0) {
        updateOne({
          url: `/cart/${itemId}`,
          method: "PUT",
          body: { quantity, productId },
        });
      } else {
        warnNotify("لا يمكن أن تكون الكمية أقل من 1");
      }
    },
    [updateOne]
  );

  // Clear Cart
  const clearCart = useCallback(() => {
    deletOne(`/cart`);
    setProductsDetails([]);
    setRemoveCart(true);
    setShowModal(false);
  }, [deletOne]);


  // delet item from database
  const handleDelete = useCallback(
    (productId) => {
      if (productId) {
        deletOne(`cart/${productId}`);
        setShowModal(false); // إغلاق الـ modal بعد الحذف
      }
    },
    [deletOne]
  );

  // handle   open modale and seve item id in selectedBrandId
  const openModalAndDeleteOne = useCallback((id) => {
    setClearAll(false);
    setSelectedBrandId(id);
    setShowModal(true);
  }, []);



  // استخدام useCallback لمنع إعادة إنشاء الدالة
  const openPaymntCommpount = useCallback(() => {
    setdisplay((prevDisplay) => !prevDisplay);
  }, []);


  // Hide discount after increasing or decreasing quantity
  const  HideDiscount  = useCallback(() => {
    setdisplayDiscount(true);
  }, []);

  // Show Product Data
  const showData = useMemo(() => {
    if (isLoading) {
      return SkeletonTeble;
    }
    if (isSuccess && productsDetails?.resnumOfCartItems > 0) {
      const cartItems = [...productsDetails.cartItems]
      return cartItems.map((product, index) => (
        <tr key={index}>
         
          <td className=" d-table-cell" scope="row">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <button
                disabled={LoadingDelet || LoadingUpdate}
                onClick={() => {
                  openModalAndDeleteOne(product?._id);
                }}
                className="btn border-0 text-danger fs-3"
              >
                {LoadingDelet  ? (
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
          <td className=" d-sm-table-cell text-end">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <div className="d-flex flex-column w-100 h-100">
                {product.product ? (
                  product.product?.title?.slice(0, 50)
                ) : (
                  <span className="text-danger">
                    {" "}
                    هذا المنتج غير متوفر حاليا
                  </span>
                )}
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
                <span className=" text-success d-none d-d-md-block">
                  <i className="text-dark"> الكمية المتوفرة :</i>(
                  {product?.product?.quantity>0 ?product?.product?.quantity:"متوفر عند الطلب"})
                </span>
              </div>
            </Fade>
            
          </td>
          <td className=" d-none d-sm-table-cell ">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <div className="w-100 d-flex align-items-center gap-1 justify-content-between">
                <IoAddOutline
                  cursor={"pointer"}
                  fontSize={"25px"}
                  color="blue"
                  onClick={() => handleQuantityChange(index, 1)}
                />
                <input
                  min={1}
                  max={2000}
                  style={{ width: "5rem" }}
                  onChange={(e) =>
                    handleQuantityChange(index, e.target.value, true)
                  }
                  type="number"
                  className="form-control  border-1  text-center bg-transparent"
                  id="quantity"
                  placeholder={productsDetails.cartItems[index].quantity}
                  value={productsDetails.cartItems[index].quantity}
                  name="quantity"
                />

                <RiSubtractLine
                  cursor={"pointer"}
                  fontSize={"25px"}
                  color="red"
                  onClick={() => handleQuantityChange(index, -1)}
                />
                {
                  <button
                    type="button"
                    disabled={
                      LoadingDelet  || LoadingUpdate
                        ? true
                        : false
                    }
                    className={
                      Confirm ? "btn  m-0 border-0 p-0 text-success" : "d-none"
                    }
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
                }
              </div>
            </Fade>
          </td>
          
        </tr>
       /*  <tr>
        <div className="w-100 d-flex d-sm-none align-items-center gap-1 justify-content-between border rounded p-2">
                <IoAddOutline
                  cursor={"pointer"}
                  fontSize={"25px"}
                  color="blue"
                  onClick={() => handleQuantityChange(index, 1)}
                />
                <input
                  min={1}
                  max={2000}
                  style={{ width: "5rem" }}
                  onChange={(e) =>
                    handleQuantityChange(index, e.target.value, true)
                  }
                  type="number"
                  className="form-control  border-1  text-center bg-transparent"
                  id="quantity"
                  placeholder={productsDetails.cartItems[index].quantity}
                  value={productsDetails.cartItems[index].quantity}
                  name="quantity"
                />

                <RiSubtractLine
                  cursor={"pointer"}
                  fontSize={"25px"}
                  color="red"
                  onClick={() => handleQuantityChange(index, -1)}
                />
                {
                  <button
                    type="button"
                    disabled={
                      LoadingDelet  || LoadingUpdate
                        ? true
                        : false
                    }
                    className={
                      Confirm ? "btn  m-0 border-0 p-0 text-success" : "d-none"
                    }
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
                }
            </div> 
        </tr> */
       
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
            <br />
            <Link to={'/'} className="btn btn- btn btn-outline-primary w-75  p-1-primary mt-2" >
            العودة للمتجر
            </Link>
          </td>
        </tr>
      );
    }
  }, [isLoading, isSuccess, productsDetails?.resnumOfCartItems, productsDetails.cartItems, LoadingDelet, LoadingUpdate, products?.imageUrl, Confirm, openModalAndDeleteOne, handleQuantityChange, handelQuantity]);

  




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
            <h1 className="text-center m-3 py-3 border-bottom">
              سلة مشترياتي{" "}
            </h1>
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
          <table className={isSuccess && productsDetails?.resnumOfCartItems > 0?"table table-striped pt-5 mt-3 text-center":'d-none'}>
            <thead >
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
                <th className=" d-none d-sm-table-cell" scope="col">
                  الكمية
                </th>
              </tr>
            </thead>
            <tbody className="">{showData}</tbody>
          </table>
          {/* data table  end*/}
        </div>

      
        <Suspense >
          {/* coupon and checkout start*/}
          <MemoizedApplayCoupon  Confirm={displayDiscount} LoadingDelet={LoadingDelet} openModalAndClearCart={openModalAndClearCart} productsDetails={productsDetails} openPaymntCommpount={openPaymntCommpount} HideDiscount={HideDiscount}
        />
      </Suspense>
      <Suspense > <MemoizedPayment  display={display} productsDetails={productsDetails} setdisplay={openPaymntCommpount}/> </Suspense >
      </div>
{/* paymnt form */}




      {/*Modal */}
      <DeleteModal
        show={showModal}
        onClose={useCallback(() => {
          setShowModal(false);
        }, [])}
        clearAll={clearAll}
        onDelete={clearAll ? clearCart : handleDelete}
        itemId={selectedBrandId}
      />

      
    </div>
  );
};

export default Cart;
