import {  useParams } from "react-router-dom";
import { useCreateOneMutation, useGetDataQuery, useUpdateOneMutation } from "../../../redux/features/api/apiSlice";
import {  useCallback, useEffect, useMemo, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { ToastContainer } from "react-toastify";
import { errorNotify, successNotify, warnNotify } from "../../../utils/Toast";
import { SkeletonCustomerAndAdress, SkeletonTeble } from "../../../utils/skeleton";
import { convertDateTime } from "../../../utils/convertDateTime";


 const Order = () => {   
   
        //   get user id from params
        const {orderId}=useParams();
    
      // get order from the database
      const {
        data: order,
        error,
        isLoading,
        isSuccess,
      } = useGetDataQuery(`orders/${orderId}`);
      const[updateOne, {
     
        error: updateError,
        isLoading: updateLoading,
        isSuccess: updateSuccess,
       
      
      }] = useUpdateOneMutation();
      const [
        createOne,
        {
          error: createError,
          isLoading: createLoading,
          isSuccess: createSuccess,
        },
      ] = useCreateOneMutation();

      const user = order?.data?.user
      const shippingAddress = order?.data?.shippingAddress
console.log(order);


      // states
      
        const openImge = (imageUrl) => {
          console.log(imageUrl);
          
          window.open(imageUrl, '_blank'); // تفتح الصورة في نافذة جديدة
        }; 
      // handle error
      useEffect(() => {
        if (error) {
          errorNotify("خطا في الخادم");
        }
        if (updateError) {
          errorNotify("خطا في تحديث التغييرات");
        }
        if (createError) {
          errorNotify("خطا في  ارسال الفاتورة");
        }
        
      }, [createError, error, updateError]);

      // handle success
      useEffect(() => {
      
        if (updateSuccess) {
          successNotify(" تمت تحديث الحاله بنجاح");
        }
        if (createSuccess) {
          successNotify("  تم ارسال الفاتورة بنجاح ");
        }
        
      }, [createSuccess, updateSuccess]);

      // handel delivered
      const handleAction = useCallback(
        (id, action) => {
          updateOne({
            url: `/orders/${id}/${action}`,
            method: "put",
          });
        },
        [updateOne]
      );



   // if sucsses and data is not empty  show the products
   const showData = useMemo(() => {
    if (isLoading) {
    return   SkeletonTeble
    }
    if (isSuccess ) {
      return order.data?.cartItems?.map((product, index) => (
        
        <tr key={index}>
 
          <td className="d-none d-md-table-cell">
            <Fade delay={0} direction='up' triggerOnce={true} cascade>
              <div className="d-flex flex-column align-items-center">
                
              <img
                style={{ width: "7rem", height: "5rem" }}
                src={`${order?.imageUrl.replace("orders", "products")}/${product?.product?.imageCover}`}
                alt="avatar"
              />
              <div className="">
             ( { product.price} )
              <i className="text-success"> SAR</i>
              </div>
              </div>
            </Fade>
          </td>
          <td className="  d-table-cell">
          <Fade delay={0} direction='up' triggerOnce={true}>

            {product?.product?.title?.slice(0,30)}
            </Fade>
            </td> 
          <td
           
            className="d-none d-sm-table-cell"
          >
                        <Fade delay={0} direction='up' triggerOnce={true} >
            <div className="d-flex flex-column align-items-center">
                <span className="d-flex flex-column align-items-center"> <i className="text-primary"> اسم القسم :</i> 
                 {product?.product?.category ? product?.product?.category?.name : "غير محدد"}
                </span>
                <span className="d-flex flex-column align-items-center"> <i className="text-primary"> اسم الشركه  :</i>
                 {product?.product?.brand ? product?.product?.brand?.name : "غير محدد"}
                </span>
            </div>
          

            </Fade>
          </td>
          <td
           
            className="d-none d-sm-table-cell "
          >
            <Fade delay={0} direction='up' triggerOnce={true} >
              <span className="d-flex flex-column align-items-center"> <i className="text-primary"> تاريح الشراء  :</i>
                {convertDateTime(order?.data?.createdAt)} 
              </span>
              <span className="d-flex flex-column align-items-center"> <i className="text-primary"> اخر تحديث  :</i>
                {convertDateTime(order?.data?.updatedAt)} 
              </span>

            </Fade>
          </td>
      
             <td className="d-none d-sm-table-cell" >
          <Fade delay={0} direction='up' triggerOnce={true} >

            {product?.quantity}
            </Fade>
            </td> 

          <td>
          <Fade delay={0} direction='up' triggerOnce={true} >

            <span className={order?.data?.isDelivered ? "text-success fw-bold":" text-danger fw-bold"}>
            
          { order?.data?.isDelivered ? (
                  "تم التوصيل"
                ) : (
                  "لم يتم التوصيل")}
             
            </span>
            </Fade>
          </td>

        </tr>
      ));
    }
    if (isLoading && order?.data.length == 0 ){ return (
      <tr>
        <td
          className="text-center p-3 fs-5 text-primary"
          colSpan={7}
          scope="row"
        >
          العنصر   عنه غير موجود   
        </td>
      </tr>
    );}
  }, [isLoading, isSuccess, order?.data?.cartItems, order?.data?.createdAt, order?.data?.isDelivered, order?.data?.length, order?.data?.updatedAt, order?.imageUrl]);
 

    const [invoicePdf, setinvoicePdf] = useState(null);
    // handle  pdf
    const handleImageChange = (event) => {
      const file = event.target.files[0];

      const pdfFile =file.type.split('/')[1]
  
     
     if (pdfFile === 'pdf') {
      setinvoicePdf(file);
     
      }else{
        warnNotify(`الملف ${file.name} ليس بصيغة صحيحة`);
        return;
      }
    };
    const sendInvoice =useCallback( (e) => {
    
      e.preventDefault();
      if (invoicePdf == null) {
        warnNotify(" يجب اختيار ملف اولا");
        return;
      }
     
      
      if (
        invoicePdf != null 
  
      ) {  
        // handel form data
        const form = new FormData();
        
        
        if (invoicePdf) {
          form.append("orderPdf", invoicePdf);
        }
        
    
        //  send form data to server
        createOne({
          url: `/orders/${orderId}/invoice`,
          body: form,
          method: "put",
        });
        
  
  
      } 

      
       
         
        },
        [createOne, invoicePdf, orderId]
      );





    
      return (<>
        <div className="container-fluid pt-5 ">
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
            {/*Customer data && address data  */}
            <Fade delay={0} direction="up" triggerOnce={true} cascade>
           {isLoading?SkeletonCustomerAndAdress:
           <div className="row m-0 w-100 ">
                <span  className="fs-5 p-3 text-center text-success ">معلومات المشتري</span>
                <div className="fs-5  p-2 border text-primary col-12 col-sm-6">
                
                  الاسم الاول 
                  <span className=" text-dark "> : {user?.firstname} 
                  </span>
                </div>
                <div className="fs-5 text-primary p-2 border col-12 col-sm-6"> 
                  الاسم الثاني
                  <span className=" text-dark "> : {user?.lastname} </span>
                </div>
                <div className="fs-5 text-primary p-2 border col-12 " >
                  البريد الالكتروني
                  
                  <span className=" text-dark "> : {user?.email} </span>
                </div>
                <div className={ user?.phone ?"fs-5 text-primary border col-12 col-sm-6":'d-none'} >
                  رقم الهاتف
                  <span className=" text-dark "> : {user?.phone} </span>
                </div>
                     {/*address data start  */}
                <div className="fs-5 py-2 text-primary border col-12 col-sm-6 ">

                  <span> الاسم البلد  </span>
                  <span className=" text-dark "> 
                    
                  : {shippingAddress?.country}
                  </span>


                </div>
                <div className="fs-5 py-2 text-primary  border col-12 col-sm-6"> 
                المدينه
                  <span className=" text-dark "> : {shippingAddress?.city} </span>
                </div>
                <div className="fs-5 py-2 text-primary border col-12 col-sm-6" >
                المنطقه
                  
                  <span className=" text-dark "> : {shippingAddress?.Area} </span>
                </div>
                <div className="fs-5 py-2 text-primary border col-12 col-sm-6" >
                الشارع
                  
                  <span className=" text-dark "> : {shippingAddress?.street} </span>
                </div>
                <div className={shippingAddress?.postalCode?"fs-5 py-2 text-primary border col-12 col-sm-6":'d-none' }>
                رمز بريدي
                  
                  <span className=" text-dark "> : {shippingAddress?.postalCode} </span>
                </div>
                <div className={shippingAddress?.Taxnumber?"fs-5 py-2 text-primary border col-12 col-sm-6":'d-none' }>
                الرقم الضريبي
                  
                  <span className=" text-dark "> : {shippingAddress?.Taxnumber} </span>
                </div>
                <div className="fs-5 py-2  text-primary  border col-12 col-sm-6" >
                  رقم الهاتف
                  
                  <span className=" text-dark "> : {shippingAddress?.phone} </span>
                </div>
                <div className="fs-5 py-2 border col-12 col-md-6 text-primary " >
                اسم الشركه او المستلم

                  <span className=" text-dark "> : {shippingAddress?.title} </span>
                </div>
                <div  onClick={()=>openImge(`${order?.imageUrl}/${order?.data?.image}`)} className="fs-5 py-2 border pointer col-12  text-primary " >
                  وصل التحويل 

                  <img height={150} width={150} className=" text-dark m-auto d-block" src={`${order?.imageUrl}/${order?.data?.image}`}/>
                </div>
                <div className={shippingAddress?.detalis?" fs-5 py-2 border  text-primary d-block ":'d-none'} >
                  تفاصيل اضافيه
                  
                  <span className=" text-dark "> : {shippingAddress?.detalis} </span>
                </div>
                {/* send pdf */}
                <div className="col-md-12 py-3 fs-5 py-2 border col-12  text-primary">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="orderPdf"
            >
                   ارسال فاتوره(pdf) 
            </label>
            <input
              accept=".pdf"
              required
              disabled={isLoading ? true : false}
              className="form-control"
              id="orderPdf"
              name="orderPdf"
              type="file"
              onChange={(e)=>handleImageChange(e)}           
               />
               </div>
                {/* buttons  str*/}
                <div className="my-2 border-bottom py-2 d-flex align-items-center justify-content-evenly flex-wrap gap-2">
                <Fade delay={0} direction='up' triggerOnce={true}    >
                    <span style={{fontWeight:'500'}}
                      className={
                        order?.data?.isDelivered
                          ? "text-success  fs-5"
                          : "text-danger fs-5"}>
                      {
                        order?.data?.isDelivered ? (
                        "تم التوصيل"
                      ) : (
                        <button disabled={order?.data?.isDelivered||updateLoading || isLoading} 
                        onClick={()=>handleAction(order?.data?._id,'deliver')} 
                        className=" btn btn-primary   ">
                            تاكيد التوصيل
                        </button>
                      )}
                    </span>
                </Fade>
                <Fade delay={0} direction='up' triggerOnce={true}    >
                <button disabled={updateLoading||isLoading || order?.data?.isPaid } 
                 onClick={sendInvoice }
                 className={order?.data?.isPaid?" btn btn-success   ":'btn btn-primary '}>
                      ارسال فاتورة
                 </button>
                </Fade>
                <Fade delay={0} direction='up' triggerOnce={true}    >
                  <h5 className="text-success">
                        {order?.data?.isPaid ?                
                        <span className="">
                     
                    <i className="text-dark"> الكود</i>
                    ( {order?.data.VerificationCode} )
                 
                    </span>:
                          <button disabled={order?.data?.isPaid||updateLoading}
                          onClick={()=>handleAction(order?.data?._id,'pay')} 
                          className=" btn btn-primary   ">
                             ارسال كود التحقق   
                          </button>}
                  </h5>
                </Fade>
                </div>
                {/* buttons  end*/}

            </div>}
            </Fade>
               
             {/* data table */}
            <table className="table table-striped pt-5 mt-3 text-center">
              
                <thead className="">
                  <tr>
                    <th className="d-none d-md-table-cell" scope="col">
                      صورة المنتج
                    </th>
                    <th className="" scope="col">الاسم المنتج</th>
                    <th className="d-none d-sm-table-cell" scope="col">
                    اسم القسم  و الشركه
                    </th>
                    <th className="d-none d-sm-table-cell" scope="col">
                      تاريخ الطلب 
                    </th>
                    <th className="d-none d-sm-table-cell"  scope="col">  الكميه</th>
                    <th className="" scope="col">
                      الاستلام
                    </th>

                  
                  
                  
                
                  </tr>
                </thead>
                <tbody className="">{showData}</tbody>
            </table>

            {/* total  Price */}
            <div className=" w-100  py-4 d-flex align-items-center  flex-column gap-1">
                    <Fade delay={0} direction="up" triggerOnce={true}>
                      <span className="  fs-5 py-3 ">
                        المجموع : (
                        { order?.data?.totalOrderPrice.toFixed(2)}
                        
                        ) <span className="ps-1 text-success">SAR</span>
                      </span>
                    </Fade>
            </div>
          
        </div>

       
      </>);
    };
    
   
    




export default Order;
