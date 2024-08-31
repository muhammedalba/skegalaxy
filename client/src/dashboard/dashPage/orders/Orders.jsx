
    import {  useCallback, useEffect, useState } from "react";
    import {Fade} from'react-awesome-reveal';
    import { Link } from "react-router-dom";
    
    import { ToastContainer } from "react-toastify";
    
    import { TiArrowSortedDown } from "react-icons/ti";
    import { TiArrowSortedUp } from "react-icons/ti";
    import { RiDeleteBin6Line } from "react-icons/ri";
    import { errorNotify, successNotify, warnNotify } from "../../../utils/Toast";
    import { useDeletOneMutation, useGetDataQuery, useUpdateOneMutation } from "../../../redux/features/api/apiSlice";
    import QuantityResults from "../../../components/QuantityResults/QuantityResults";
    import Navigation from "../../../components/navigation/Navigation";
    import { useSelector } from "react-redux";

import { SkeletonTeble } from "../../../utils/skeleton";
import { FilterData } from "../../../utils/filterSearh";
    
    const Orders = () => {





      // Get the lookup value from the store
      const search = useSelector((state) => state.serch);     
      const limit = useSelector((state) => state.QuantityResult);
      const Pagination = useSelector((state) => state.Pagination);

      //   get user id from params
   
      // get orders from the database
      const [confirmed, setconfirmed] = useState(false);
      // get orders from the database
      const {
        data: orders,
        error,
        isLoading,
        isSuccess,
      } = useGetDataQuery(`orders?limit=${limit}&page=${Pagination}&isDelivered=${confirmed}`);
     console.log(error);


      const[updateOne, {
     
        error: updateError,
        isLoading: updateLoading,
        isSuccess: updateSuccess,
       
      
      }] = useUpdateOneMutation();
      const[deletOne, {
     
        error: deletError,
        isLoading: deletLoading,
        isSuccess: deletSuccess,
       
      
      }] = useDeletOneMutation();
    
      isSuccess&&  console.log(orders, "order");
    console.log(deletError);
    
      // states
      const [sorted, setsorted] = useState(false);
    

      useEffect(() => {
        if (updateSuccess) {
          successNotify("تم تحديث العنصر بنجاح");
        }
        if (deletSuccess) {
          successNotify("تم تحديث العنصر بنجاح");
        }
      }, [deletSuccess, updateSuccess]);
      useEffect(() => {
        if(error?.status ===401){
          warnNotify('انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا')
        }
      },[error?.status])
   useEffect(() => {
        if (error||updateError) {
          errorNotify("خطا في الخادم");
        }
        if (deletError?.status==402) {
          errorNotify("غير مصرح لك فعل ذلك");
        }
      }, [deletError?.status, error, updateError]);
    
      // handel sort
 const handleSort = () => {
        setsorted(!sorted);
      };

  const handelDelivered=(id)=>{
       
      //  send form data to server
      updateOne({
        url: `/orders/${id}/deliver`,
        method: "put",
      });

      }
      
// Handi pay 
  const handliPay=(id)=>{
        //  send form data to server
        updateOne({
          url: `/orders/${id}/pay`,
          method: "put",
        });
  
        }
    // delete order
    const deletOrder=(id)=>{
      if(id){
        if (confirm("هل انت متاكد بانك تريد حذف هذا العنصر")) {
            //  send form data to server
            deletOne( `/orders/${id}` );
      
        }
        } else{
        warnNotify('العنصر غير موجود')
      }
       
    }
        // const handlidisplayOrders =useCallback(()=>setconfirmed(!confirmed),[confirmed])   


      //// search orders based on the search input  by email, firstname, lastname && sorted (a,b)
      const filteredUsers = FilterData(orders?.data,'users',search)?.sort(
            
        (a, b) =>
          sorted ? a._id.localeCompare(b._id): b._id.localeCompare(a._id) 
      );

    

      // if sucsses and data is not empty  show the orders
      const showData =
        isSuccess && !isLoading && filteredUsers.length > 0 ? (
          
          filteredUsers.map((order, index) => {
            return (
              <tr className="text-center" key={index}>

    
                <td className="">
                <Fade delay={0} direction='up' triggerOnce={true}    >

                  <span>{order?.user?.firstname}</span>
                </Fade>

                </td>
                <td className="d-none d-sm-table-cell">
                <Fade delay={0} direction='up' triggerOnce={true}    >

                  <span>{order?.cartItems.length}</span>
                </Fade>

                </td>
                <td className="d-none d-md-table-cell ">
                
                <Fade delay={0} direction='up' triggerOnce={true}    >
                  <span>
                    {order.totalOrderPrice.toFixed(2)}
                    <span className="ps-1 text-success">SAR</span>
                  </span>
                </Fade>
                  {/* <span className="">{convertDateTime(order.createdAt)}</span> */}
                  
                </td>
         


                <td className={"d-none d-md-table-cell"}>
                <Fade delay={0} direction='up' triggerOnce={true}    >

                  <span style={{fontWeight:'500'}}
                    className={
                      order.isDelivered
                        ? "text-success  fs-5"
                        : "text-danger fs-5"
                    }
                  >
                  {
                       order.isDelivered ? (
                      "تم التوصيل"
                    ) : (
                      <button disabled={order.isDelivered|| updateLoading || deletLoading} onClick={()=>handelDelivered(order._id)} className=" btn btn-primary   ">
                          تاكيد التوصيل
                   </button>
                    )}
                  </span>
                  </Fade>
                </td>
       

                <td className="d-none d-sm-table-cell" scope="row">
                <Fade delay={0} direction='up' triggerOnce={true}   >
                  <span className= "text-dark  fs-5">
                    {order?.isPaid &&order?.VerificationCode ?
                    <span className="">
                      <span>
                    <i className="text-success"> الكود</i>
                    ( {order?.VerificationCode?order?.VerificationCode:'سيتم ارساله عند توصيل'} )
                  </span>
                    </span>

                    :
                      <button disabled={order?.isPaid||updateLoading||deletLoading} onClick={()=>handliPay(order._id)} className=" btn btn-primary   ">
                         ارسال كود الاستلام   
                       </button>}
                  </span>
                </Fade>

                </td>


                <td style={{ width: "50px" }} className="d-none d-sm-table-cell">
                <Fade delay={0} direction='up' triggerOnce={true}    >

                      <span className="">{order.paymentMethodType}</span>
                </Fade>
              </td>
                <td>
                <Fade delay={0} direction='up' triggerOnce={true}    >

                  <Link to={`${order._id}`} className="btn btn-success text-white">
                    عرض
                  </Link>
                  </Fade>
                </td>
                <td>
                <Fade delay={0} direction='up' triggerOnce={true}    >

                <button
              disabled={updateLoading || updateLoading||isLoading}
              onClick={() => deletOrder(order._id)}
              className=" border-0"
            >
                <RiDeleteBin6Line  fontSize={'1.5rem'} color="red"/>
            </button>
                  </Fade>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td
              className="text-center p-3 fs-5 text-primary"
              colSpan={8}
              scope="row"
            >
              {search.length !== 0
                ? " العنصر المراد البحث عنه غير موجود في هذه الصفحه"
                : "لا توجد أي عناصر"}
            </td>
          </tr>
        );


      return (
        <div className="w-100 pt-5 ">
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
    
          {/*  create buttun  && length data && limit data */}
          <QuantityResults
           
            isSuccess={isSuccess}
            dBtn={false}
            path={"/createorder"}
            dataLength={orders?.results}
            isLoading={isLoading}
          />

          {/* data table */}

          <button disabled={confirmed}  className={!confirmed?" btn btn-primary fs-5 text-white pointer text-primary m-1 ":'m-1  btn btn-success fs-5 pointer text-white' }
          onClick={useCallback(() => setconfirmed(!confirmed), [confirmed])} > 
           الطلبات السابقة
           
           </button>
           <button disabled={!confirmed}  className={confirmed?" btn btn-primary fs-5 text-white pointer text-primary m-1":' m-1 btn btn-success fs-5 pointer text-white'  }
          onClick={useCallback(() => setconfirmed(!confirmed), [confirmed])} > 
          الطلبات الحاليه 
           
           </button>
          <table className="table table-striped  pt-5 mt-3 ">
            <thead>
              <tr className="text-center">
                <th
                  onClick={handleSort}
                  className="  d-md-table-cell"
                  scope="col"
                >
                  {sorted ? <TiArrowSortedUp /> : <TiArrowSortedDown />}اسم الزبون
                </th>
    
                <th className="d-none d-sm-table-cell" scope="col">   عدد المنتجات </th>
                <th className="d-none d-md-table-cell" scope="col">
                 
                السعر الاجمالي    
                        
                </th>
    
                <th className={"d-none d-md-table-cell "} scope="col">
                  حالة الطلب <br />   
                </th>
                <th className="d-none d-sm-table-cell" scope="col"> حالة الدفع </th>
                <th  className="nowrap d-none d-sm-table-cell" scope="col">نوع الدفع</th>
                <th scope="col">عرض</th>
                <th scope="col">حذف</th>
              </tr>
            </thead>
            <tbody className="">{isLoading ? SkeletonTeble : showData}</tbody>
          </table>
    
          {/*navigation start  */}
          <Navigation
            isLoading={isLoading}
            isSuccess={isSuccess}
            status={orders?.poginationResult || {}}
          />
        </div>
      );
    };
    

    


export default Orders;
