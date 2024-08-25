// import { useEffect, useState } from "react";
// import {useGetDataQuery,useDeletOneMutation,} from "../../../redux/features/api/apiSlice";
// import { Link } from "react-router-dom";
// import { ToastContainer} from "react-toastify";
// // icon
// import { TiArrowSortedDown } from "react-icons/ti";
// import { TiArrowSortedUp } from "react-icons/ti";

// import Navigation from "../../../components/navigation/Navigation";
// import { useSelector } from "react-redux";
// import QuantityResults from "../../../components/QuantityResults/QuantityResults";
// import { errorNotify, successNotify } from "../../../utils/Toast";
// import { SkeletonTeble } from "../../../utils/skeleton";

// const SubCategories = () => {
//   // Get the lookup value from the store
//   const search = useSelector((state) => state.serch);
//   const limit = useSelector((state) => state.QuantityResult);
//   const Pagination = useSelector((state) => state.Pagination);


//   // get subcategory from the database
//   const {
//     data: subcategories,
//     error,
//     isLoading,
//     isSuccess,
//   } = useGetDataQuery(`subcategory?limit=${limit}&page=${Pagination}`);
//   console.log(subcategories?.data);
//   // delete subcategory from the database
//   const [
//     deletOne,
//     { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
//   ] = useDeletOneMutation();
// console.log(errorDelet);
//   // states
//   const [sorted, setsorted] = useState(false);


  
  
  
//   //handel error our  success message 

//   useEffect(() => {
//     if (!LoadingDelet && SuccessDelet) {
//       successNotify("تم الحذف بنجاح")
//     }
//     if (errorDelet || error) {
//       errorNotify("خطأ في الخادم الداخلي")
//     }
//   }, [ SuccessDelet, LoadingDelet, errorDelet, error]);

//   // handel delet one
//     const handelDelet = (id) => {
//       const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
//       // if (confirm) true delet user from database
//       delet && deletOne(`/subcategory/${id}`);
//     };

//   // handel sort
//   const handleSort = () => {
//     setsorted(!sorted);
//   };
//   // Filter your search by symbols
//   const escapeRegExp = (string) => {
//     return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // يضيف \ أمام الأحرف الخاصة
//   };

//   //// search subcategories based on the search input  by email, firstname, lastname && sorted (a,b)
//   const filteredUsers =
//     search.length !== 0
//       ? subcategories?.data.filter((subcategory) => {
//         const regex = new RegExp(escapeRegExp(search),"i"); 
        

//           return regex.test(subcategory.name);
//         })
//       : subcategories &&
//         [...subcategories.data].sort((a, b) =>
//           sorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
//         );

//   // if sucsses and data is not empty  show the categories
//   const showData =
//     isSuccess &&
//     !isLoading &&filteredUsers.length > 0 ?
//     filteredUsers.map((subcategory, index) => {
//       return (
//         <tr key={index}>
//           <td className="" scope="row">
//             {index + 1}
//           </td>
//           <td  ><span className="">{subcategory.name}</span></td>
//           <td>
//             <Link to={subcategory._id} className="btn btn-success">
//               تعديل
//             </Link>
//           </td>
//           <td>
//             <button
//               disabled={LoadingDelet ? true : false}
//                 onClick={() => handelDelet(subcategory._id)}
//               className="btn btn-danger"
//             >
//               {LoadingDelet ? <span className="spinner-border"></span> : "حذف"}
//             </button>
//           </td>
//         </tr>
//       );
//     }): (<tr><td className="text-center p-3 fs-5 text-primary"colSpan={7} scope="row">العنصر المراد البحث عنه غير موجود في هذه الصفحه</td></tr>);


//   return (
//     <div className="w-100 pt-5 ">
//       {/* tosat compunenet */}
//       <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         closeOnClick
//         rtl={true}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />

//       {/*  create buttun  && length data && limit data */}
//       <QuantityResults
   
//         isSuccess={isSuccess}
//         isLoading={isLoading}
//         path={"createsubcategory"}
//         dataLength={filteredUsers?.length}
//       />

//       {/* data table */}
//       <table className="table pt-5 mt-3">
//         <thead>
//           <tr>
//             <th
//               onClick={handleSort}
//               className="d-non  d-md-table-cell"
//               scope="col"
//             >
//               {sorted ? <TiArrowSortedUp /> : <TiArrowSortedDown />}ترتيب
//             </th>
//             <th scope="col">الاسم </th>
//             <th scope="col">عرض</th>
//             <th scope="col">الحذف</th>
//           </tr>
//         </thead>
//         <tbody className="">{isLoading ? SkeletonTeble : showData}</tbody>

//       </table>

//       {/*navigation start  */}
//       <Navigation
//         isLoading={isLoading}
//         isSuccess={isSuccess}
//         status={subcategories?.poginationResult || {}}

//       />
//     </div>
//   );
// };

// export default SubCategories;
