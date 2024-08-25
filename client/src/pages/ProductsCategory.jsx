import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import logo from "../imges/logo.png";
// icons
import { FaChartLine } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { MdOutlineTitle } from "react-icons/md";
import { FaStore } from "react-icons/fa6";


import { useDispatch, useSelector } from "react-redux";
import { cartitems } from "../redux/features/Slice/CartSlice";
import {
  useCreateOneMutation,
  useGetDataQuery,
} from "../redux/features/api/apiSlice";
import { errorNotify, infoNotify, successNotify, warnNotify } from "../utils/Toast";
import Cookies from "universal-cookie";

const ProductsCategory = () => {
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);
 

  // Bring the product
  const { CategoryId } = useParams();
  // 
  
  // get category from the database
  const {
    data: products,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(`products?category=${CategoryId}`);
  // create category with rtk
  const [
    createOne,
    {
      error: createError,
      isSuccess: createsuccess,
      isLoading: Createloading,
      
    },
  ] = useCreateOneMutation();


  const [ProductData, setProductData] = useState([]);
  const [formData, setformData] = useState({
    productId: "",
    Playerid: "",
  });
  // get token
  const cookies=new Cookies();
   const token= cookies.get('token');

  const [display, setdisplay] = useState(false);
  //  console.log(products?.data,'products');
  
console.log(createError);

  // handel order
  const handelOrder = (product) => {
    // console.log(product);
    setProductData(product);
    setformData({ ...formData, productId: product.id });
    setdisplay(true);
  };
  //handel error our  success message


 
  useEffect(() => {
    if (createsuccess) {
      setdisplay(false);
      successNotify(" تم اضافة المنتج بنجاح ");
    }
    if (createError ) {
      if(createError.status === 401){
      errorNotify('لم تقم بتسجيل الدخول، يرجى تسجيل الدخول لتتمكن من الوصول إلى هذا الطريق');
      setdisplay(false);
    
        }
        else if(createError.status === 400){
        infoNotify('هذا العنصر موجود بالفعل');
        setdisplay(false);
     
        }
        else{
      errorNotify("خطأ في الخادم الداخلي");
      setdisplay(false);

    }
        
    }
    if(error){
      errorNotify("خطأ في الخادم الداخلي");
      setdisplay(false);
    }
    }, [error, createsuccess, createError?.status, createError]);

  // Filter your search by symbols
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // يضيف \ أمام الأحرف الخاصة
  };

  //// search products based on the search input  by email, firstname, lastname && sorted (a,b)
  const filteredUsers =
    search.length !== 0
      ? products?.data.filter((product) => {
          const regex = new RegExp(escapeRegExp(search), "i");
          return regex.test(product.title);
        })
      : products && [...products.data];

  // if sucsses and data is not empty  show the products
  const showData =
    isSuccess && !isLoading && filteredUsers.length > 0 ? (
      filteredUsers.map((product, index) => {
        return (
          <div
            onClick={() => handelOrder(product)}
            key={index}
            className="card  m-auto "
            style={{ width: "18rem" }}
          >
            <img
              style={{ height: "150px" }}
              src={
                product.imageCover
                  ? `${products?.imageUrl}/${product.imageCover}`
                  : logo
              }
              className="card-img-top border-bottom"
              alt="product"
            />
            <div
              style={{ height: "75px" }}
              className="card-body d-flex align-items-center justify-content-between"
            >
              <h5 className="card-title text-dark">{product.title}</h5>
              <h5 className="card-title text-dark">{product.price} $ </h5>
            </div>
          </div>
        );
      })
    ) : (
      <div className="w-100 text-center">
        <p className="text-center p-3 fs-5 text-primary ">
          لايوجد عناصر
        </p>
      </div>
    );

  // loading styles st
  const arry = [1, 2, 3, 4, 5, 6, 7];
  const spinner =
    isLoading &&
    arry.map((index) => {
      return (
        <div
          key={index}
          className="card m-auto "
          style={{ height: "200px", width: "18rem" }}
        >
          <div className="w-100 " style={{ height: "150px" }}>
            <span className="skeleton-loading  h-100 w-100" />
          </div>
          <div style={{ height: "50px" }} className="card-body">
            <h5 className="card-title h-100 ">
              <span className="skeleton-loading w-50 h-100  col-6" />
            </h5>
          </div>
        </div>
      );
    });
  // loading styles end

  const handleChange = (id) => {
    setformData({ ...formData, Playerid: id.target.value });
  };
  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if(token){
      createOne({
        url: "/cart",
        body: formData,
        method: "post",
      });
      // dispatch(cartitems(formData));


    } else{
            warnNotify('يجب تسجيل الدخول أولا');
      return;
    }
  };

  return (
    <div className="w-100 pt-5 position-relative ">
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
      <div className="container-fluid ">
        <div className="w-100 d-flex row-gap-3 mt-3  gap-2 flex-wrap align-items-center justify-content-between">
          {/*product card */}
          {isLoading ? spinner : showData}
        </div>

      </div>
      {/* order form start */}
      <div  className="  px-4 w-100 z-3 position-fixed"
           style={{
            height:'100%',
              backgroundColor: "#0a0a0ab0",
              display: display ? "block" : "none",
              top:' 0%',
              right: '0%',
            
            // transform:'translate(0%, -50%)',
            }}
           
          >  
              <form
                  style={{
                    backgroundColor: "var(--bgColor)",
                    color: "var(--text-color)",zIndex: 99999,
                    position:'fixed',
                    // top:' 0%',
                    right:'50%',
                    transform:' translate(50%,  50%)',
                    bottom: '46%',
                    maxHeight: '100vh',

                  }}
                  onSubmit={handleSubmit}
                  className="m-auto p-3 rounded-4 mt-5 "
                >
                  {/* title */}
                  <div className="col-sm-12 py-2">
                    <label
                      className="p-1 fs-5 d-flex align-items-center gap-1"
                      htmlFor={"title"}
                    >
                  
                      <MdOutlineTitle/>
                      الاسم المنتج
                    </label>

                    <input
                      disabled
                      className="form-control"
                      id={"title"}
                      name={"title"}
                      type={"Text"}
                      placeholder={"ادخل الاسم المنتج"}
                      defaultValue={ProductData.title}
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
                          سعرالمنتج
                        </label>
                        <input
                          disabled
                          className="form-control"
                          id={"price"}
                          name={"price"}
                          type={"text"}
                          placeholder={" سعر المنتج"}
                          value={`$ ${ProductData.price} `}
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
                          disabled
                          className="form-control"
                          id={"priceAfterDiscount"}
                          name={"priceAfterDiscount"}
                          type={"text"}
                          placeholder={"   سعر المنتج بعد الخصم"}
                          value={`$ ${ProductData.priceAfterDiscount} `}
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
                          (id) ايدي اللاعب
                        </label>
                        <input
                          minLength={5}
                          required
                          className="form-control"
                          id={"quantity"}
                          name={"quantity"}
                          type={"text"}
                          placeholder={"ادخل  (id) ايدي اللاعب"}
                          defaultValue={formData.Playerid}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label
                          className="p-1 fs-5 d-flex align-items-center gap-1"
                          htmlFor={"sold"}
                        >
                        
                          <FaChartLine/>
                          المبيعات
                        </label>
                        <input
                          disabled
                          className="form-control"
                          id={"sold"}
                          name={"sold"}
                          type={"number"}
                          placeholder={" عدد المبيعات"}
                          defaultValue={ProductData.sold}
                        />
                      </div>
                    </div>
                  </div>

                  {/* error msg */}
                  {/* {ErrorMsge && (
                      <span className="w-100 text-center d-block text-danger pt-3">
                        {ErrorMsge}
                      </span>
                    )} */}
      
                        <div className=" d-flex align-items-center justify-content-between">
                          <button
                            disabled={isLoading||Createloading ? true : false}
                            className="btn btn-primary my-4 d-flex align-items-center"
                            type="submit"
                          >
                           
                          { Createloading  ?   <span className="spinner-border"></span>:
                             <span className="">اضافه الى السله </span> 
                          
                          }
                           
                           
                          </button>
                          <span
                            onClick={useCallback(() => {
                              setdisplay(false);
                            }, [])}
                            disabled={Createloading ? true : false}
                            className="btn btn-danger my-4 d-flex align-items-center"
                          >
                            {Createloading ? (
                              <span className="spinner-border"></span>
                            ) : (
                              <span className="">الغاء</span>
                            )}
                          </span>
                        </div> 
                  

              </form>
      </div>
      {/* order form end */}


      

     </div>
  );
};

export default ProductsCategory;
