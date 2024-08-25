import { useCallback, useEffect, useState } from "react";


import { Link, useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";



import {

  errorNotify,
  infoNotify,

} from "../../utils/Toast";
import {useGetDataQuery } from "../../redux/features/api/apiSlice";
import QuantityResults from "../../components/QuantityResults/QuantityResults";
import Navigation from "../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import { convertDateTime } from "../../utils/convertDateTime";

const UserTransfer = () => {
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);
//   get user id from params
    const {userid}=useParams();

  const [Pagination, setPagination] = useState(1);
  // get transfers from the database
  const [limit, setlimit] = useState(10);
  // get transfers from the database
  const [confirmed, setconfirmed] = useState(false);
  // get transfers from the database
  const {
    data: Transfers,
    error,
    isLoading,
    isSuccess,
  } = useGetDataQuery(
    `users/${userid}/transfers`
  );
  
  console.log(Transfers?.data);


  // states
  const [sorted, setsorted] = useState(false);

  //handel navigation bar start
  // currentPage
  const handelcurrentPagePagination = (currentPage) => {
    setPagination(currentPage);
  };
  // next page
  const handelPlusPagination = () => {
    setPagination((pre) => pre + 1);
  };
  // prev page
  const handelminusPagination = () => {
    // Pagination >1 && Pagination--
    setPagination((pre) => pre - 1);
  };
  // The number of items to be displayed
  const handelLimetData = (limitData) => {
    if (limitData.target.value > 0 && limitData.target.value <= 50) {
      setlimit(limitData.target.value);
    } else {
      infoNotify("   يجب ان تكون القيمه اقل من 50 واكبر من 0");
    }
  };
  //handel navigation bar end

  //handel error our  success message

  useEffect(() => {
   if(error) {
        errorNotify("خطأ في الخادم الداخلي");
      }
    }
  , [error]);


 
  // handel sort
  const handleSort = () => {
   
    setsorted(!sorted);
  };
  // Filter your search by symbols
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // يضيف \ أمام الأحرف الخاصة
   
  };

  //// search Transfers based on the search input  by email, firstname, lastname && sorted (a,b)
  const filteredUsers =
    search.length !== 0
      ? Transfers?.data.filter((transfer) => {
          const regex = new RegExp(escapeRegExp(search), "i");

          return regex.test(transfer.user.firstname) || regex.test(transfer.user.email);
        })
      : Transfers &&
        [...Transfers.data].sort(
          (a, b) => sorted ?  b._id.localeCompare(a._id):a._id.localeCompare(b._id)
        );
  // if sucsses and data is not empty  show the Transfers
  const showData =
    isSuccess && (!isLoading && filteredUsers.length > 0) ? (
      filteredUsers.map((transfer, index) => {
        return (
          <tr className="text-center" key={index}>
            <td className="d-none d-md-table-cell" scope="row">
              {index + 1}
            </td>
 
            <td className="text-center">
              <span>
                {transfer.confirmed
                  ? transfer.Quantitytransferred
                  : transfer.amount}
              </span>
            </td>
            <td className="d-none d-md-table-cell">
              <span className="">{isSuccess &&transfer?.createdAt ? convertDateTime(transfer?.createdAt):'غير معروف'}</span>
            </td>

            <td className="d-none d-md-table-cell">
              {transfer.image ? (
                <img
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  src={`${Transfers.imageUrl}/${transfer.image}`}
                  alt="avatar"
                />
              ) : (
                "لا يوجد صورة"
              )}
            </td>
            <td className="">
              <span
                type="submit"
                className={
                  !transfer.confirmed ? "text-primary -2 fs-5" : "text-success fs-5"
                }
         
           
              >
                {  
                  
                  transfer.confirmed ? (
                  "تم تاكيد"
                ) : (
                  "   لم يتم التاكيد"
                )}
              </span>
            </td>
            <td>
              <Link to={`/transfers/${transfer._id}`} className="btn btn-success">       
                  عرض

              </Link>
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
       {   search.length !== 0? " العنصر المراد البحث عنه غير موجود في هذه الصفحه":
        "لا توجد أي عناصر"}
        </td>
      </tr>
    );

  // loading styles st
  const arry = [1, 2, 3, 4, 5, 6, 7];
  const spiner =
 
    (isLoading &&
      arry.map((index) => {
        return (
          <tr className="text-center" key={index}>
            <td className="" scope="row">
              <h5 className="skeleton-loading "></h5>
            </td>
            <td>
              <span className="skeleton-loading"></span>
            </td>
            <td>
              <span className="skeleton-loading"></span>
            </td>
            <td>
              <span className="skeleton-loading"></span>
            </td>
            <td>
              <span className="skeleton-loading"></span>
            </td>

            <td className="d-none d-md-table-cell ">
              <span className="skeleton-loading "></span>
            </td>
            <td style={{ width: "50px" }}>
              <Link className="btn btn-success  skeleton-loading">
                <span className="">تعديل</span>
              </Link>
            </td>
            <td style={{ width: "50px" }}>
              <button
                className="btn btn-danger skeleton-loading "
               
              >
                <span className="">حذف</span>
              </button>
            </td>
          </tr>
        );
      }));
  // loading styles end
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
        handelLimetData={handelLimetData}
        isSuccess={isSuccess}
        dBtn={true}
        path={"/createtransfer"}
        dataLength={Transfers?.results}
        isLoading={isLoading}
      />
      <div
        onClick={useCallback(() => setconfirmed(!confirmed), [confirmed])}
        className="w-100 text-center fs-3 text-primary user-select-none"
        style={{cursor: 'pointer'}}
      >
        {!confirmed ? "الطلبات التحويل الحاليه  " : " الطلبات التحويل المؤكدة"}
        {!confirmed ? <TiArrowSortedUp />  : <TiArrowSortedDown /> }
      </div>
      {/* data table */}
      <table className="table pt-5 mt-3">
        <thead>
          <tr className="text-center">
            <th
              onClick={handleSort}
              className="d-none  d-md-table-cell"
              scope="col"
            >
              {sorted ? <TiArrowSortedUp /> : <TiArrowSortedDown />}ترتيب
            </th>
  
            <th scope="col"> المبلغ المحول </th>
            <th className="d-none d-md-table-cell" scope="col">  تاريخ الطلب </th>
          
            <th className="d-none d-md-table-cell" scope="col">
              الصورة الوصل
            </th>
            <th
              className={confirmed ? "d-none d-md-table-cell" : ""}
              scope="col"
            >
              {confirmed ? " الطلبات الحاليه" : "الطلبات المؤكده"}
            </th>

            <th scope="col">عرض</th>
           
          </tr>
        </thead>
        <tbody className="">{isLoading ? spiner : showData }</tbody>
      </table>
 
      {/*navigation start  */}
      <Navigation
        isLoading={isLoading}
        isSuccess={isSuccess}
        status={Transfers?.poginationResult || {}}
        PlusAction={handelPlusPagination}
        minusAction={handelminusPagination}
        currentPage={handelcurrentPagePagination}
        limitData={handelLimetData}
      />
    </div>
  );
};




export default UserTransfer;
