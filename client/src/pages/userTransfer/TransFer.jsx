
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {useGetOneQuery,} from "../../redux/features/api/apiSlice";
//    icons
import { IoIosPricetag } from "react-icons/io";

import { FaStore } from "react-icons/fa6";
import { BsCalendarDate } from "react-icons/bs";       
import { ToastContainer } from "react-toastify";


import { errorNotify } from "../../utils/Toast";
import { convertDateTime } from "../../utils/convertDateTime";
import logo from '../../imges/logo.png'
const TransFer = () => {
  // Bring the user number Id
  const { TransferId } = useParams();

  //get data (rtk redux)
  const {
    isLoading,
    isSuccess,
    data: transfers,
    error,
  } = useGetOneQuery(`transfers/${TransferId}`);



  console.log(transfers,'transfers');



useEffect(() => {
  if (error) {
    errorNotify("Error fetching data");
  }
},[error]);








  
const transferDatiles = ()=>{
  return <form 
   
    className="m-auto p-3">
        {/* image */}
      <div className="w-100 py-2">
        <img
          className="logo rounded m-auto d-none d-sm-block"
          src={
            isSuccess 
            ? `${transfers?.imageUrl}/${transfers?.data?.image}`
              :logo
          }
          alt="Receipt received"
        />
      </div>
      {isSuccess && (
        <h2 className="w-75 text-center m-auto py-2 border-bottom  ">
            طلب التحويل
        </h2>
      )}

      {/* amount  confirmed */}
      <div className="col-sm-12 py-2 ">
        <div className="row">
          <div className="col-sm-6">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor={"amount"}
            >
              <IoIosPricetag />
              المبلغ المحول
            </label>
            <input
              step={0.01}
              disabled={true}
              className="form-control"
              id={"amount"}
              name={"amount"}
              type={"number"}
              placeholder={"ادخل المبلغ المرسل"}
              defaultValue={!transfers?.data.confirmed ? transfers?.data.amount: transfers?.data.Quantitytransferred}
          
            />
          </div>
          <div className="col-sm-6">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor={"confirmed"}
            >
              <IoIosPricetag />
             حالة التحويل
            </label>
            <input
             
              disabled={true}
          
              className="form-control"
              id={"confirmed"}
              name={"confirmed"}
              type={"text"}
              placeholder={"  ادخل سعر المنتج بعد الخصم"}
              value={transfers?.data.confirmed ?'تم التاكيد' :'لم يتم التاكيد '}
             
            />
          </div>
        </div>
      </div>
      {/* createdAt and  email*/}
      <div className="col-md-12 py-2">
        <div className="row">
          <div className="col-sm-6">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor={"email"}
            >
              <FaStore />
              الايميل
            </label>
            <input
              disabled={ true }
            
              className="form-control"
              id={"email"}
              name={"email"}
              type={"email"}
              placeholder={"ايميل المستخدم"}
              defaultValue={transfers?.data.user.email.slice(0,-4)}
            />
          </div>
          <div className="col-sm-6">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-2"
              htmlFor="createdAt"
            >
              <BsCalendarDate />
              تاريخ الانشاء
            </label>
            <input
              className="form-control"
              placeholder=" تاريخ الانشاء"
              name={"createdAt"}
              id="createdAt"
              disabled
              type="date"
              value={ isSuccess && transfers?.data?.createdAt && convertDateTime(transfers?.data?.createdAt)}
            />
          </div>
        </div>
      </div>    


         </form>
}
  



  return (
    <>
      <div className="container pt-5 my-5">
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

  {!isLoading?
 <form 
   
 className="m-auto p-3">
     {/* image */}
   <div className="w-100 py-2">
     <img
       className="logo rounded m-auto d-none d-sm-block"
       src={
         isSuccess 
         ? `${transfers?.imageUrl}/${transfers?.data?.image}`
           :logo
       }
       alt="Receipt received"
     />
   </div>
   {isSuccess && (
     <h2 className="w-75 text-center m-auto py-2 border-bottom  ">
         طلب التحويل
     </h2>
   )}

   {/* amount  confirmed */}
   <div className="col-sm-12 py-2  ">
     <div className="row">
       <div className="col-sm-6">
         <label
           className="p-1 fs-5 d-flex align-items-center gap-1"
           htmlFor={"amount"}
         >
           <IoIosPricetag />
           المبلغ المحول
         </label>
         <input
           step={0.01}
           disabled={true}
           className="form-control"
           id={"amount"}
           name={"amount"}
           type={"number"}
           placeholder={"ادخل المبلغ المرسل"}
           defaultValue={!transfers?.data.confirmed ? transfers?.data.amount: transfers?.data.Quantitytransferred}
       
         />
       </div>
       <div className="col-sm-6">
         <label
           className="p-1 fs-5 d-flex align-items-center gap-1"
           htmlFor={"confirmed"}
         >
           <IoIosPricetag />
          حالة التحويل
         </label>
         <input
          
           disabled={true}
       
           className="form-control"
           id={"confirmed"}
           name={"confirmed"}
           type={"text"}
           placeholder={"  ادخل سعر المنتج بعد الخصم"}
           value={transfers?.data.confirmed ?'تم التاكيد' :'لم يتم التاكيد '}
          
         />
       </div>
     </div>
   </div>
   {/* createdAt and  email*/}
   <div className="col-md-12 py-2">
     <div className="row">
       <div className="col-sm-6">
         <label
           className="p-1 fs-5 d-flex align-items-center gap-1"
           htmlFor={"email"}
         >
           <FaStore />
           الايميل
         </label>
         <input
           disabled={ true }
         
           className="form-control"
           id={"email"}
           name={"email"}
           type={"email"}
           placeholder={"ايميل المستخدم"}
           defaultValue={transfers?.data.user.email.slice(0,-4)}
         />
       </div>
       <div className="col-sm-6">
         <label
           className="p-1 fs-5 d-flex align-items-center gap-2"
           htmlFor="createdAt"
         >
           <BsCalendarDate />
           تاريخ الانشاء
         </label>
         <input
           className="form-control"
           placeholder=" تاريخ الانشاء"
           name={"createdAt"}
           id="createdAt"
           disabled
           type="date"
           value={ isSuccess && transfers?.data?.createdAt && convertDateTime(transfers?.data?.createdAt)}
         />
       </div>
     </div>
   </div>    


  </form>
:
<form 
   
className="m-auto p-3 ">
    {/* image */}
  <div className="w-100 py-2">
    <img
      className="logo rounded m-auto d-none d-sm-block"
      src={logo}
      alt="Receipt received"
    />
  </div>
  {isSuccess && (
    <h2 className="w-75 text-center m-auto py-2 border-bottom skeleton-loading  "></h2>
  )}

  {/* amount  confirmed */}
  <div className="col-sm-12 py-2  ">
    <div className="row">
      <div className="col-sm-6">
        <label
          className="p-1 fs-5 d-flex align-items-center gap-1 skeleton-loading "
          htmlFor={"amount"}
        >
          <IoIosPricetag />
           
        </label>
        <input
       
          className="form-control skeleton-loading  m-1"
       
          
      
        />
      </div>
      <div className="col-sm-6">
        <label
          className="p-1 m-1 fs-5 d-flex align-items-center gap-1 skeleton-loading "
          htmlFor={"confirmed"}
        >
          <IoIosPricetag />
         
        </label>
        <input
         
        
      
          className="form-control m-1 skeleton-loading "
          id={"confirmed"}
          name={"confirmed"}
       
         
        />
      </div>
    </div>
  </div>
  {/* createdAt and  email*/}
  <div className="col-md-12 py-2 " >
    <div className="row">
      <div className="col-sm-6">
        <label
          className="p-1 fs-5 d-flex align-items-center gap-1 skeleton-loading m-1"
          htmlFor={"email"}
        >
          <FaStore />
          
        </label>
     
      </div>
      <div className="col-sm-6">
        <label
          className="p-1 fs-5 d-flex align-items-center gap-2 skeleton-loading m-1"
          htmlFor="createdAt"
        >
          <BsCalendarDate />
    
        </label>

      </div>
    </div>
  </div>    


 </form>
}


      </div>
    </>
  );
};




export default TransFer;



