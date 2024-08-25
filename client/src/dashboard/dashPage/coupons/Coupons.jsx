


    import { useEffect, useState } from "react";
    import {
      useGetDataQuery,
      useDeletOneMutation,
    } from "../../../redux/features/api/apiSlice";
    
    import { useSelector } from "react-redux";
    import { Fade } from "react-awesome-reveal";
    import { SkeletonTeble } from "../../../utils/skeleton";
    
    import { Link } from "react-router-dom";
    import Navigation from "../../../components/navigation/Navigation";
    import QuantityResults from "../../../components/QuantityResults/QuantityResults";
    
    import { ToastContainer } from "react-toastify";
    import { errorNotify, successNotify } from "../../../utils/Toast";
    // icons
    import { TiArrowSortedDown } from "react-icons/ti";
    import { TiArrowSortedUp } from "react-icons/ti";
import { convertDateTime } from "../../../utils/convertDateTime";
import { FilterData } from "../../../utils/filterSearh";
    
  const Coupons = () => {
      // Get the lookup value from the store
      const search = useSelector((state) => state.serch);
      const limit = useSelector((state) => state.QuantityResult);
      const Pagination = useSelector((state) => state.Pagination);
    console.log(Pagination,'Pagination');
    
    
      // const [Pagination, setPagination] = useState(1);
    
      // get coupons from the database
      const {
        data: coupons,
        error,
        isLoading,
        isSuccess,
      } = useGetDataQuery(`coupons?limit=${limit}&page=${Pagination}`);
      console.log(error);
      // delete coupons from the database
      const [
        deletOne,
        { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
      ] = useDeletOneMutation();
    
      // states
      const [sorted, setsorted] = useState(false);
    
    
    
      
    
      
      //handel error our  success message 
    
      useEffect(() => {
        if (!LoadingDelet && SuccessDelet) {
          successNotify("تم الحذف بنجاح");
        }
    
        if (errorDelet || error) {
          errorNotify("خطأ في الخادم الداخلي");
        }
      }, [ SuccessDelet, LoadingDelet, errorDelet, error]);
    
      // handel delet one
        const handelDelet = (id) => {
          const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
          // if (confirm) true delet user from database
          delet && deletOne(`/coupons/${id}`);
        };
    
      // handel sort
      const handleSort = () => {
        setsorted(!sorted);
      };
     
    
      //// search coupons based on the search input  by email, firstname, lastname && sorted (a,b)
      const filterCoupons =FilterData(coupons?.data,'name',search)?.sort((a, b) =>
              sorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
            );
    
      // if sucsses and data is not empty  show the coupons
      const showData =
        isSuccess &&
        !isLoading &&filterCoupons.length > 0 ?
        filterCoupons.map((coupons, index) => {
          return (
            <tr key={index}>
              <td className="d-none d-md-table-cell" scope="row">
              <Fade delay={0} direction='up' triggerOnce={true}   >
                {index + 1}
                </Fade>
              </td>
              <td  >
              <Fade delay={0} direction='up' triggerOnce={true}   >
                <span className="">{coupons.name}</span>
                </Fade>
                </td>
    
              <td className="d-none d-sm-table-cell">
                <Fade delay={0} direction='up' triggerOnce={true}   >
                <span className="">{convertDateTime(coupons.createdAt)}</span>

                </Fade> 
             </td>
             <td className="d-none d-md-table-cell">
                <Fade delay={0} direction='up' triggerOnce={true}   >
                <span className="">{coupons.discount}<i className="text-success">%</i> </span>

                </Fade> 
             </td>
              <td>
              <Fade delay={0} direction='up' triggerOnce={true}   >
    
                <Link to={coupons._id} className="btn btn-success">
                  تعديل
                </Link>
                </Fade>
              </td>
              <td>
              <Fade delay={0} direction='up' triggerOnce={true}   >
    
                <button
                  disabled={LoadingDelet ? true : false}
                    onClick={() => handelDelet(coupons._id)}
                  className="btn btn-danger"
                >
                  {LoadingDelet ? <span className="spinner-border"></span> : "حذف"}
                </button>
                </Fade>
              </td>
            </tr>
          );
        }): (<tr><td className="text-center p-3 fs-5 text-primary"colSpan={7} scope="row">العنصر المراد البحث عنه غير موجود في هذه الصفحه</td></tr>);
    
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
            isLoading={isLoading}
            path={"createCoupon"}
            dataLength={filterCoupons?.length}
          />
    
          {/* data table */}
          <table className="table table-striped  pt-5 mt-3">
            <thead>
              <tr>
                <th
                  onClick={handleSort}
                  className="d-none  d-md-table-cell"
                  scope="col"
                >
                  {sorted ? <TiArrowSortedUp /> : <TiArrowSortedDown />}ترتيب
                </th>
                <th scope="col">الاسم </th>
                
                <th className="d-none d-sm-table-cell" scope="col">تاريخ الانتهاء </th>
                <th className="d-none d-md-table-cell" scope="col">
                القيمه
                </th>
                <th scope="col">عرض</th>
                <th scope="col">الحذف</th>
              </tr>
            </thead>
            <tbody className="">{isLoading ? SkeletonTeble : showData}</tbody>
    
          </table>
    
          {/*navigation start  */}
          <Navigation
            isLoading={isLoading}
            isSuccess={isSuccess}
            status={coupons?.poginationResult || {}}
           
          />
        </div>
      );
    };

    

export default Coupons;
