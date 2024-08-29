import { useEffect, useState } from "react";
import {
  useGetDataQuery,
  useDeletOneMutation,
} from "../../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";


import Navigation from "../../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import QuantityResults from "../../../components/QuantityResults/QuantityResults";
import { Fade } from "react-awesome-reveal";
import { errorNotify, successNotify } from "../../../utils/Toast";
import { SkeletonTeble } from "../../../utils/skeleton";
import { FilterData } from "../../../utils/filterSearh";








const Users = () => {
  
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);
  const QuantityResult = useSelector((state) => state.QuantityResult);
  const Pagination = useSelector((state) => state.Pagination);
  
  
  // states
  const [sorted, setsorted] = useState(false);
  // get users from the database 
  const {data:users, error,isLoading,isSuccess,} = useGetDataQuery(`users?limit=${QuantityResult}&page=${Pagination}`);
    console.log(error);
  // delete users from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();



  




  useEffect(() => {
    
    if (!LoadingDelet && SuccessDelet) {
  successNotify("تم الحذف بنجاح");
    }

    if (errorDelet || error) {
      errorNotify("خطأ في الخادم الداخلي");
    }
  }, [SuccessDelet, LoadingDelet, errorDelet, error]);





// handel delet one
  const handelDelet = (id) => {
    const delet = confirm("هل انت متاكد بانك تريد حذف هذا العنصر");
    // if (confirm) true delet user from database
    delet && deletOne(`/users/${id}`);
  };



  // handel sort
  const handleSort = () => {
    setsorted(!sorted)
  };

// search users based on the search input  by email, firstname, lastname && sorted (a,b)


const filteredUsers= FilterData(users?.data,'users',search)?.sort((a, b) => sorted ?b.firstname.localeCompare(a.firstname): a.firstname.localeCompare(b.firstname));

// if sucsses and data is not empty  show the users
  const showData = isSuccess && !isLoading && filteredUsers.length > 0  ? filteredUsers.map((user, index) => {
    return (
      <tr key={index}>
        <td className="d-none d-sm-table-cell" scope="row">
            <Fade delay={0} direction='up' triggerOnce={true}>

              {index +1}
            </Fade>
          </td>
        <td>
          <Fade delay={0} direction='up' triggerOnce={true}>

            {user.firstname}
          </Fade>
        </td>
        <td style={{ maxWidth: '10rem', overflow: 'hidden' }} className="d-none d-sm-table-cell">
        <Fade delay={0} direction='up' triggerOnce={true}>

          {user.email}
          </Fade>
          </td>
        <td className="d-none d-md-table-cell">
        <Fade delay={0} direction='up' triggerOnce={true}>
        {user.role}
        </Fade></td>
        <td className="d-none d-md-table-cell">
        <Fade delay={0} direction='up' triggerOnce={true}>

          <img
            style={{ width: "4rem", height: "4rem" , borderRadius: "50%" }}
            
            src={`${users.imageUrl}/${user.image}`}
            alt="avatar"
          /></Fade>
        </td>
        <td>
        <Fade delay={0} direction='up' triggerOnce={true}>

          <Link to={user._id} className="btn btn-success">
            تعديل
          </Link></Fade>
        </td>
        <td>              
          <Fade delay={0} direction='up' triggerOnce={true} >

          {user.role.toLowerCase() !== "admin" ? (
            <button
              disabled={LoadingDelet ? true : false}
              onClick={() => handelDelet(user._id)}
              className="btn btn-danger"
            >
           {  LoadingDelet? <span className="spinner-border"></span>:
              'حذف'}
            </button>
          )
          : (
            <button
              disabled
             
              className="d-none"
            >
           {  LoadingDelet? <span className="spinner-border"></span>:
              'حذف'}
            </button>
          )
          
          }
       </Fade>
        </td>
      </tr>
    );
  }): (<tr><td className="text-center p-3 fs-5 text-primary"colSpan={7} scope="row">العنصر المراد البحث عنه غير موجود   </td></tr>)
     
 

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
      //  handelLimetData={handelLimetData}  
        isSuccess ={isSuccess}
        isLoading={isLoading}
       path={'createUser'}
       dataLength={filteredUsers?.length}/>
            
      {/* data table */}
      <table className="table table-striped pt-5 mt-3">
        <thead>
          <tr >
            <th onClick={handleSort} className="d-none  d-sm-table-cell" scope="col">{ sorted?<TiArrowSortedUp />:<TiArrowSortedDown/>}ترتيب</th>
            <th scope="col">الاسم الاول</th>
            <th className="d-none d-sm-table-cell" scope="col">البريد الالكتروني</th>
            <th className="d-none d-md-table-cell" scope="col">المهمه</th>
            <th className="d-none d-md-table-cell" scope="col">الصورة</th>
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
      status={users?.poginationResult|| {}} 
      />
 
    
  </div>

  );
};

export default Users;
