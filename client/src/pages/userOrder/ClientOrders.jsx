
import { useCallback, useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { errorNotify } from "../../utils/Toast";
import { useGetDataQuery } from "../../redux/features/api/apiSlice";
import QuantityResults from "../../components/QuantityResults/QuantityResults";
import Navigation from "../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import { convertDateTime } from "../../utils/convertDateTime";
import { Fade } from "react-awesome-reveal";
import { SkeletonTeble } from "../../utils/skeleton";
const ClientOrders = () => {
 
    
 
      // Get the lookup value from the store
      const limit = useSelector((state) => state.QuantityResult);
      const Pagination = useSelector((state) => state.Pagination);
      // felter orders status
      const [confirmed, setconfirmed] = useState(false);
      // get orders from the database
      const {
        data: orders,
        error,
        isLoading,
        isSuccess,
      } = useGetDataQuery(
        `orders?limit=${limit}&page=${Pagination}&isDelivered=${confirmed}`
      );
    
      useEffect(() => {
        if (error) {
          errorNotify("خطا في الخادم");
        }
      }, [error]);
    
      isSuccess && console.log(orders?.data);
    
      const showData = useMemo(() => {
        if (isLoading) {
          return SkeletonTeble;
        }
        if (isSuccess && orders?.data.length > 0) {
          return orders?.data.map((order, index) => (
            <tr className="text-center" key={index}>
              <td className="d-none d-md-table-cell" scope="row">
                <Fade delay={0} direction="up" triggerOnce={true} cascade>
                  {index + 1}
                </Fade>
              </td>
    
              <td className="text-center">
                <Fade delay={0} direction="up" triggerOnce={true} cascade>
                  <span>{order?.cartItems.length}</span>
                </Fade>
              </td>
              <td className="d-none d-sm-table-cell">
                <Fade delay={0} direction="up" triggerOnce={true} cascade>
                  <span className="">{convertDateTime(order?.createdAt)}</span>
                </Fade>
              </td>
    
              <td className={"d-none d-md-table-cell"}>
                <Fade delay={0} direction="up" triggerOnce={true} cascade>
                  <span
                    className={
                      order.isDelivered ? "text-success  fs-5" : "text-danger fs-5"
                    }
                  >
                    {order.isDelivered ? "تم الارسال" : "   لم يتم الارسال"}
                  </span>
                </Fade>
              </td>
              <td className="text-center">
                <Fade delay={0} direction="up" triggerOnce={true} cascade>
                  <span>
                    ( {order.totalOrderPrice} )<i className="text-success"> SAR</i>
                  </span>
                </Fade>
              </td>
              <td>
                <Fade delay={0} direction="up" triggerOnce={true} cascade>
                  <Link
                    to={`/orders/${order._id}`}
                    className="btn btn-outline-primary "
                  >
                    عرض
                  </Link>
                </Fade>
              </td>
            </tr>
          ));
        }
        if (isSuccess && orders?.data.length == 0) {
          return (
            <tr>
              <td
                className="text-center p-3 fs-5 text-primary"
                colSpan={7}
                scope="row"
              >
                لا توجد أي عناصر
              </td>
            </tr>
          );
        }
      }, [isLoading, isSuccess, orders?.data]);
    
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
            path="/"
            dataLength={orders?.results}
            isLoading={isLoading}
          />
          
          <div
            onClick={useCallback(() => setconfirmed(!confirmed), [confirmed])}
            className={!confirmed?"  fs-3 pointer text-success user-select-none":'fs-3 pointer text-dark  user-select-none' }
            style={{ cursor: "pointer" }}
          >
        الطلبات الحاليه  
          </div>
          <div
            onClick={useCallback(() => setconfirmed(!confirmed), [confirmed])}
            className={confirmed?"  fs-3 pointer text-success user-select-none":'fs-3 pointer text-dark  user-select-none' }
            style={{ cursor: "pointer" }}
          >
             الطلبات  السابقة
          </div>
          {/* data table */}
          <table className="table pt-5 mt-3">
            <thead>
              <tr className="text-center">
                <th className="d-none  d-md-table-cell" scope="col">
                  ترتيب
                </th>
    
                <th scope="col"> عدد المنتجات </th>
                <th className="d-none d-sm-table-cell" scope="col">
                  تاريخ الطلب
                </th>
    
                <th className={"d-none d-md-table-cell"} scope="col">
                  {confirmed ? "الطلبات السابقة" : " الطلبات الحاليه"}
                </th>
    
                <th scope="col">السعر الاجمالي </th>
                <th scope="col">عرض</th>
              </tr>
            </thead>
            <tbody className="">{showData}</tbody>
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
    
   
    

export default ClientOrders;
