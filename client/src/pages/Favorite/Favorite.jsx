import { useCallback, useEffect, useMemo, useState } from "react";


import {

  useCreateOneMutation,
  useDeletOneMutation,
  useGetDataQuery,

} from "../../redux/features/api/apiSlice";

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
import { Link } from "react-router-dom";




const Favorite = () => {


  // API Queries and Mutations
  const {data: products,error,isLoading,isSuccess,} = useGetDataQuery(`wishlist`);
 
  const [ deletOne,{ error: errorDelete, isLoading: LoadingDelet, isSuccess: successDelete },] = useDeletOneMutation();
  
  const [ createOne,{ error: errorCreate, isLoading: LoadingCreatet, isSuccess: successCreate },] = useCreateOneMutation();


  // State Management
  // Recipient Description
  const cookies = new Cookies();



  
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showModal, setShowModal] = useState(false);
   

  useEffect(() => {
    if(successCreate){
      successNotify('تم اضافه المنتج بنجاح ')
    
    }
    if(errorCreate){
      errorNotify('خطأ في اضافه المنتج ')
    }
  },[errorCreate, successCreate])






  
 


  const token = cookies.get("token");







  // Effect for handling deletion success
  useEffect(() => {
    if (successDelete) {
  successNotify("تم حذف العنصر بنجاح");
     
    }
    if (errorDelete) {
      errorNotify("خطأ في الخادم");
    }
  }, [ errorDelete, successDelete]);



  useEffect(() => {
    if (error?.status === 401 && token) {
      warnNotify("انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا");
    }
  }, [error?.status, token]);





 



  const addproducToCartOurWishlist = useCallback((productId) => {
 
    
    // تحقق من أن المستخدم مسجل الدخول وأن معرف المنتج صالح
    if (token && typeof(productId) !== "undefined") {
      
      
      createOne({
        url: 'cart',
        method: "POST",
        body: { productId },
      })
   
    } else {
      warnNotify("يجب عليك تسجيل دخول اولا");
     
    }
  }, [createOne, token]);




  // delet item from database
  const handleDelete = useCallback(
    (productId) => {
      if (productId) {
        deletOne(`wishlist/${productId}`);
        setShowModal(false); // إغلاق الـ modal بعد الحذف
      }
    },
    [deletOne]
  );

  // handle   open modale and seve item id in selectedBrandId
  const openModalAndDeleteOne = useCallback((id) => {

    setSelectedBrandId(id);
    setShowModal(true);
  }, []);








  // Show Product Data
  const showData = useMemo(() => {
    if (isLoading) {
      return SkeletonTeble;
    }
    if (isSuccess && products?.result > 0) {
      const cartItems = [...products.data]
      
      return cartItems.map((product, index) => (
           //  show Quantity

   
        <tr key={index}>
        
          <td className=" d-table-cell" scope="row">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <button
                disabled={LoadingDelet }
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
              <Link to={`/products/${product.id}`}>
                 <img
                   loading="lazy"
                   decoding="async"
                 width={225} 
                style={{ width: "100px", height: "80px" }}
                src={`${product?.imageCover}`}
                alt="product"
              />
              </Link>
           
            </Fade>
          </td>
          <td className="d-none d-sm-table-cell  pe-3">
            <Fade delay={0} direction="up" triggerOnce={true}>
              <div className="d-flex flex-column text-end w-100 h-100">

                {product ? (
                <span className=""> { product?.title?.slice(0, 70)}</span>
                ) : (
                  <span className="text-danger">
              
                    هذا المنتج غير متوفر حاليا
                  </span>
                )}
                <span
                  className={`${
                    product?.priceAfterDiscount
                      ? "text-danger text-decoration-line-through"
                      : "text-danger "
                  }`}
                >
                  ({product?.price} )
                  <i className="text-success"> SAR</i>
                </span>

                <span className={product?.priceAfterDiscount?"py-1 text-danger":"d-none"}>
                  ({product?.priceAfterDiscount} )
                  <i className="text-success"> SAR</i>
                </span>

                {/*handle quantity  */}
                <div className={`fw-bold fs-5 pt-1 d-flex align-items-center  `}>
                  <span className={`card-title ps-1 d-${ product?.quantity === 0?'none':''}`}>الكمية  </span>
                  <span className="text-secondary d-flex align-items-center ">
                      { product?.quantity> 0 ?`( ${product?.quantity.toFixed(0)} )`:''}

                  </span>                      
                    <span className={`text-danger  fs-6 ${product?.quantity <= 100 && product?.quantity !== 0? " d-block" : "d-none"} `}>   كميه محدودة   </span>
                    <span className={`text-danger  fs-6 ${product?.quantity === 0 ? " d-block" : "d-none"} `}>     يتوفر عند الطلب</span>
                </div>
             
              </div>
            </Fade>
          </td>
          <td>
               {/* add to cart */}
               <button
                  disabled={LoadingCreatet || isLoading}
                  style={{ whiteSpace: 'nowrap'}}
                  onClick={() => addproducToCartOurWishlist(product?._id,'cart')}
                  className="btn btn-primary  border-0">
          
                {isLoading? <span className=" spinner-border"></span>:' اضافه الى السلة'}
             
               </button>
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
            المفضلة فارغه
          </td>
        </tr>
      );
    }
  }, [LoadingCreatet, LoadingDelet, addproducToCartOurWishlist, isLoading, isSuccess, openModalAndDeleteOne, products?.data, products?.result]);

  




  return (
    <div className="container pt-5  ">
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
        <div className="col-12  flex">
          <Fade delay={0} direction="up" triggerOnce={true}>
            <h1 className="text-center m-3 py-3 border-bottom">
                المفضلة
  
            </h1>
          </Fade>

          {/* products results */}

          {isSuccess && products?.result > 0&& (
            <Fade delay={0} direction="up" triggerOnce={true}>
              <span className="fs-5 p-2 border-bottom  d-block w-100">
                عدد المنتجات : ( {products?.result} )
              </span>
            </Fade>
          )}
         

          {/* data table  start*/}
          <table className="table table-striped pt-5 mt-3 text-center">
         {products?.result > 0&&  <thead>
              <tr>
                <th className=" d-table-cell" scope="col">
                  حذف
                </th>
                <th className="d-table-cell" scope="col">
                  صورة المنتج
                </th>
                <th className="d-none d-sm-table-cell text-end" scope="col">
                  معلومات المنتج
                </th>
                <th className="d-none d-sm-table-cell " scope="col">
                 اضافه الى السلة
                </th>
              </tr>
            </thead>}
            <tbody className="">{showData}</tbody>
          </table>
          {/* data table  end*/}
        </div>

      
        
      </div>




      {/*Modal */}
      <DeleteModal
        show={showModal}
        onClose={useCallback(() => {
          setShowModal(false);
        }, [])}
      
        onDelete={ handleDelete}
        itemId={selectedBrandId}
      />

      
    </div>
  );
};

export default Favorite;
