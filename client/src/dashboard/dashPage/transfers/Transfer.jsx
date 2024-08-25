
//     import { useEffect, useState } from "react";
//     import { useNavigate, useParams } from "react-router-dom";
//     import {
//       useUpdateOneMutation,
  
//       useGetOneQuery,
//       useDeletOneMutation,
      
//     } from "../../../redux/features/api/apiSlice";
// //    icons
//     import { IoIosPricetag } from "react-icons/io";
//     import { MdOutlineTitle } from "react-icons/md";
//     import { FaStore } from "react-icons/fa6";
//     import { BsCalendarDate } from "react-icons/bs";       
//     import { ToastContainer } from "react-toastify";
 
    
//     import { errorNotify, successNotify, warnNotify } from "../../../utils/Toast";
//     import { convertDateTime } from "../../../utils/convertDateTime";
    
//     const Transfer = () => {
//       // Bring the user number Id
//       const { transfersId } = useParams();
    
//       //get data (rtk redux)
//       const {
//         isLoading,
//         isSuccess,
//         data: transfers,
//         error,
//       } = useGetOneQuery(`transfers/${transfersId}`);


    
//       // delete transferss from the database
//       const [deletOne, { error: errorDelet ,isSuccess:successDelet}] =
//         useDeletOneMutation();
    
//       // update data (rtk redux) review
//       const [
//         updateOne,
//         {
//           error: updateError,
//           isLoading: loading,
//           isSuccess: updatesuccess,
        
//         },
//       ] = useUpdateOneMutation();
    
    
//     // states
//       const [ErrorMsge, setErrorMsge] = useState("");
//       const navegate = useNavigate();
    
    

    
//       // isSuccess
//       useEffect(() => {
   
//         if (updatesuccess || successDelet) {
//          successNotify(`تمت  التعديل بنجاح`);
    
//           navegate(`/dashboard/transfers`);
//         }
//       }, [successDelet, updatesuccess, navegate]);
 
      

//       // handel errors
//       useEffect(() => {
//         if (updateError  || error || errorDelet) { 
//             if(updateError?.status ===400){
//                 setErrorMsge(`  تم تأكيد النقل مقدما  `);errorNotify(`   تم تأكيد النقل مقدما ` );
//             }
//             if(errorDelet?.status ===400){
//                 setErrorMsge(`  لم يتم تحويل المبلغ للمحفظة بعد `);warnNotify(`   لم يتم تحويل المبلغ للمحفظة بعد`)}
//       else{
//         setErrorMsge(` خطا في الخادم`);
//         errorNotify(` خطا في الخادم`);
//       }
          
//         }
//       }, [updateError, error, errorDelet]);
    

//       // handelConfiem
//       const handelConfiem = (e) => {
//         e.preventDefault();
//           //  send form data to server
//           updateOne({
//             url: `/transfers/${transfersId}`,
//             body:{ CheckTheTransfer: true } , 
//             method: 'put',
//           });
          
    
    
     
//       };


//       // handel delet review 
//       const handelDelet = (id) => {
//         const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
//         // if (confirm) true delet transfers from database
//         delet && deletOne(`/transfers/${id}`);
          

//       };
    

//       return (
//         <>
//           <div className="container pt-5">
//             <ToastContainer
//               position="top-right"
//               autoClose={2000}
//               hideProgressBar={false}
//               closeOnClick
//               rtl={true}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="colored"
//             />
    
//             <form 
//             onSubmit={handelConfiem} 
//             className="m-auto p-3">
//                 {/* image */}
//               <div className="w-100 py-2">
//                 <img
//                   className="logo rounded m-auto d-none d-sm-block"
//                   src={
//                     isSuccess 
//                     ? `${transfers?.imageUrl}/${transfers?.data?.image}`
//                       :''
//                   }
//                   alt="Receipt received"
//                 />
//               </div>
//               {isSuccess && (
//                 <h2 className="w-75 text-center m-auto py-2 border-bottom">
//                    وصل الارسال
//                 </h2>
//               )}
//               {/* firstname */}
//               <div className="col-sm-12 py-2">
//                 <label
//                   className="p-1 fs-5 d-flex align-items-center gap-1"
//                   htmlFor={"firstname"}
//                 >
//                   <MdOutlineTitle />
//                   اسم  المرسل
//                 </label>
    
//                 <input
//                   disabled={true }
//                   minLength={3}
//                   maxLength={32}
//                   className="form-control"
//                   id={"firstname"}
//                   name={"tifirstnametle"}
//                   type={"Text"}
//                   placeholder={"ادخل اسم المرسل"}
//                   defaultValue={transfers?.data.user.firstname}
               
//                 />
//               </div>
//               {/* amount  confirmed */}
//               <div className="col-sm-12 py-2">
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <label
//                       className="p-1 fs-5 d-flex align-items-center gap-1"
//                       htmlFor={"amount"}
//                     >
//                       <IoIosPricetag />
//                       المبلغ المحول
//                     </label>
//                     <input
//                       step={0.01}
//                       disabled={true}
//                       className="form-control"
//                       id={"amount"}
//                       name={"amount"}
//                       type={"number"}
//                       placeholder={"ادخل المبلغ المرسل"}
//                       defaultValue={!transfers?.data.confirmed ? transfers?.data.amount: transfers?.data.Quantitytransferred}
                  
//                     />
//                   </div>
//                   <div className="col-sm-6">
//                     <label
//                       className="p-1 fs-5 d-flex align-items-center gap-1"
//                       htmlFor={"confirmed"}
//                     >
//                       <IoIosPricetag />
//                      حالة التحويل
//                     </label>
//                     <input
                     
//                       disabled={true}
                  
//                       className="form-control"
//                       id={"confirmed"}
//                       name={"confirmed"}
//                       type={"text"}
//                       placeholder={"  ادخل سعر المنتج بعد الخصم"}
//                       value={transfers?.data.confirmed ?'تم التاكيد' :'لم يتم التاكيد '}
                     
//                     />
//                   </div>
//                 </div>
//               </div>
//               {/* createdAt and  email*/}
//               <div className="col-md-12 py-2">
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <label
//                       className="p-1 fs-5 d-flex align-items-center gap-1"
//                       htmlFor={"email"}
//                     >
//                       <FaStore />
//                       الايميل
//                     </label>
//                     <input
//                       disabled={ true }
                    
//                       className="form-control"
//                       id={"email"}
//                       name={"email"}
//                       type={"email"}
//                       placeholder={"ايميل المستخدم"}
//                       defaultValue={transfers?.data.user.email.slice(0,-4)}
//                     />
//                   </div>
//             { transfers?.data?.createdAt &&      <div className="col-sm-6">
//                     <label
//                       className="p-1 fs-5 d-flex align-items-center gap-2"
//                       htmlFor="createdAt"
//                     >
//                       <BsCalendarDate />
//                       تاريخ الانشاء
//                     </label>
//                     <input
//                       className="form-control"
//                       placeholder=" تاريخ الانشاء"
//                       name={"createdAt"}
//                       id="createdAt"
//                       disabled
//                       type="date"
//                       value={ isSuccess && transfers?.data?.createdAt && convertDateTime(transfers?.data?.createdAt)}
//                     />
//                   </div>}
//                 </div>
//               </div>    
//               {/* error msg */}
//               {ErrorMsge && (
//                 <span className="w-100 text-center d-block text-danger pt-3">
//                   {ErrorMsge}
//                 </span>
//               )}
    
//               <div className="d-flex align-items-center justify-content-between w-100">
//                 <button
//                     disabled={isLoading || loading ||transfers?.data.confirmed ? true : false}
//                     className="btn btn-primary my-4 d-flex align-items-center w-25 "
//                     type="submit"
//                 >
//                     {isLoading || loading ? (
//                     <span className="spinner-border"></span>
//                     ) : (
//                     <span className="text-center w-100">تاكيد</span>
//                     )}
//                 </button>
//                 <button
//                     disabled={isLoading || loading ? true : false}
//                     className="btn btn-danger my-4 d-flex align-items-center w-25"
//                     type="button"
//                     onClick={() =>handelDelet(transfers?.data._id)}
//                 >
//                     {isLoading || loading ? (
//                     <span className="spinner-border"></span>
//                     ) : (
//                     <span className="text-center w-100">حذف</span>
//                     )}
//                 </button>
//               </div>

//             </form>
    
 
//           </div>
//         </>
//       );
//     };
    
    
    

// export default Transfer;
