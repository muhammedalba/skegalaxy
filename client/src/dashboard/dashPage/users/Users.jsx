import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGetDataQuery,
  useDeletOneMutation,
} from "../../../redux/features/api/apiSlice";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import Navigation from "../../../components/navigation/Navigation";
import { useSelector } from "react-redux";
import QuantityResults from "../../../components/QuantityResults/QuantityResults";
import { Fade } from "react-awesome-reveal";
import { errorNotify, successNotify } from "../../../utils/Toast";
import { SkeletonTeble } from "../../../utils/skeleton";
import DeleteModal from "../../../components/deletModal/DeleteModal";
import Cookies from "universal-cookie";







const Users = () => {
  
  // Get the lookup value from the store
  const search = useSelector((state) => state.serch);
  const QuantityResult = useSelector((state) => state.QuantityResult);
  const Pagination = useSelector((state) => state.Pagination);
  
  const cookies= new Cookies()
  const role = cookies.get("role");

  const show=role.toLowerCase() === "admin"?'block':'none' 
   
  console.log(show);
  
  // states
  const [sorted, setsorted] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // get users from the database 
  const {data:users, error,isLoading,isSuccess,} = useGetDataQuery(`users?limit=${QuantityResult}&page=${Pagination}&keywords=${search}&fields=firstname,email,image,role`);
    console.log(error);
  // delete users from the database
  const [
    deletOne,
    { error: errorDelet, isLoading: LoadingDelet, isSuccess: SuccessDelet },
  ] = useDeletOneMutation();



  

console.log(users);



  useEffect(() => {
    
    if (!LoadingDelet && SuccessDelet) {
  successNotify("تم الحذف بنجاح");
    }

    if (errorDelet || error) {
      errorNotify("خطأ في الخادم الداخلي");
    }
  }, [SuccessDelet, LoadingDelet, errorDelet, error]);






  // handel open modale and seve item id in selectedBrandId
  const openModal = useCallback((id) => {
  
    setSelectedBrandId(id);
    setShowModal(true); // فتح الـ modal
  
},[])
// delet item from database
const handleDelete =useCallback((id) => {

  if(id){
    deletOne(`/users/${id}`);
    setShowModal(false); // إغلاق الـ modal بعد الحذف

  }
}
,[deletOne]);


  // handel sort
  const handleSort = () => {
    setsorted(!sorted)
  };

// if sucsses and data is not empty  show the users
 
   const showData = useMemo(() => {
    if (isLoading) {
  return SkeletonTeble
    }
    if (isSuccess && users?.data?.length > 0) {
      const filteredProducts =[...users.data]
      return filteredProducts.map((user, index) => (
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
  
                 <Link to={user._id} className={`btn btn-outline-success d-${role.toLowerCase() === "manger" &&user. role.toLowerCase()=='admin'?'none':'' }`}>
                     <CiEdit   />  
                 </Link></Fade>
               </td>
               <td>              
                 <Fade delay={0} direction='up' triggerOnce={true} >
  
           
                   <button
                     disabled={LoadingDelet ? true : false}
                     className={`btn btn-outline-danger d-${role.toLowerCase() === "manger" &&user. role.toLowerCase()=='admin'?'none':'block' } `}
                    onClick={() => openModal(user._id)}
                  >
                         <RiDeleteBin6Line/>
                  </button>
           
         
           
           
             </Fade>
              </td>
            </tr>
      ));
    }
    return (
      <tr>
        <td
          className="text-center p-3 fs-5 text-primary"
          colSpan={7}
          scope="row"
        >
          لايوجد بيانات
        </td>
      </tr>
    );
  }, [isLoading, isSuccess, users?.data, users?.imageUrl, role, LoadingDelet, openModal]);

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
       dataLength={users?.data?.length}/>
            
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
        {/*Modal */}
  <DeleteModal
        show={showModal}
        onClose={useCallback(() =>{ setShowModal(false)},[])}
        onDelete={handleDelete}
        itemId={selectedBrandId}
      />
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
