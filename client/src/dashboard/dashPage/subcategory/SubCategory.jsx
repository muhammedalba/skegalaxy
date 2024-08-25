


// import  { useEffect, useState } from 'react';
// import logo from './../../../imges/logo.png'
// import { errorNotify, infoNotify, successNotify } from '../../../utils/Toast';

// import {  useNavigate, useParams } from 'react-router-dom';
// import { useUpdateOneMutation, useGetOneQuery } from '../../../redux/features/api/apiSlice';
// // icons
// import {  FaUser } from 'react-icons/fa';
// import { ToastContainer } from 'react-toastify';
// import { BsCCircleFill } from 'react-icons/bs';
// import { MdOutlineCategory } from "react-icons/md";
// import { convertDateTime } from '../../../utils/convertDateTime';


// const SubCategory = () => {
//     const navegate=  useNavigate();
//   // Bring the subcategory number Id 
//   const {subcategoryId} = useParams();

//   //get data (rtk redux) 
//   const {isLoading,isSuccess,data, error}=useGetOneQuery(`subcategory/${subcategoryId}`);

// // update data (rtk redux)
//   const [ updateOne,{error:updateeror,isLoading:updateloading,isSuccess:updatesuccess ,data:updateDate}]=useUpdateOneMutation();
//     // get categories from db
//     const {
//       isLoading: loadingCatego,
//       isSuccess: SucccessCatego,
//       data: categories,
//     } = useGetOneQuery(`categories`);





// //  states
//  const [changed, setchanged] = useState(false);
// const [formData,setFormData]=useState({
//     name:'',
//     category:''
//  })
  


//   // isSuccess 
// useEffect(()=>{
//   if(isSuccess){
//    setFormData({
//     name:data.data.name,
//     category:data.data.category?._id
    
//   })

//   }
//   if(updatesuccess){

//     successNotify(`تمت  التعديل بنجاح`)

//     navegate(`/dashboard/subcategories`)
//   }
// },[isSuccess, updatesuccess, navegate, data?.data?.name, data?.data?.category])

// // handel errors
// useEffect(()=>{
  
// if(updateeror){
//     if(updateeror?.status === 400){
//         errorNotify('هذا الاسم مستخدم بالفعل');
//       }else{
//         errorNotify(` خطا في الخادم`);
//       }
// }
// error&& errorNotify('خطا في الخادم')
// },[error, updateeror])
  


// // handleSubmit
// const handleSubmit=(e)=>{
//   e.preventDefault();
//   if(formData.category !== null){
//     const category =formData.category
//     console.log({category});
//        //  send form data to server
//        updateOne({
//          url:`/subcategory/${subcategoryId}` ,
       
//          body: changed ? formData :{category},
//          method: 'put',
//        });
//   }else{ 
    
//     infoNotify('  يجب تعبئه الاسم والقسم ')
//   }

   
 
// }


//  // handleChange
// const handleChange=(e)=>{
//   e.target.id === 'name'&& setchanged(true);
//   setFormData({...formData,[e.target.id]:e.target.value})
// console.log(changed);
//  }


//   // view categories
//   const showCategorie = SucccessCatego && !loadingCatego ? (
//     categories.data?.map((category, index) => {
//       return (
//         <option key={index} value={category._id}>
//           {category.name}
//         </option>
//       );
//     })
//   ) : (
//     <option value="">nodata</option>
//   );

//     return (

//     <div className="container pt-5">
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

//       <form 
//       onSubmit={handleSubmit} 
//       className="m-auto p-3">
//         <div className="w-100 py-2">
//           <img
//             className="logo m-auto d-none d-sm-block"
//             src={logo}
            
//             alt="subcategory"
//           />
//         </div>
//       { isSuccess && <h2 className="w-75 text-center m-auto py-2 border-bottom">
//           {data.data.name}   
//           </h2>}
//           {/* name */}
//         <div className="col-md-12 py-2">
//             <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor={"name"}>
//               <FaUser />
//             اسم الفرع     
//             </label>

//             <input 
//               minLength={ 3}
//               maxLength={32}
//               className="form-control"
//               id={'name'}
//               name={'name'}
//               type={'Text'}
//               placeholder={"ادخل الاسم الفرع"}
//               value={ formData.name}
//               onChange={handleChange}
              
        
//             />
//         </div>
//         {/* category and creatAT */}
//         <div className="col-sm-12">
//             <div className="row">
//               <div className="col-sm-6">
//                 <label
//                   className="pt-2  fs-5 d-flex align-items-center gap-2"
//                   htmlFor="category"
//                 >
//                   <MdOutlineCategory color="var(--spanColor)" fontSize="1rem" />
//                   اختر القسم
//                 </label>
//                 <select
//                   disabled={isLoading || updateloading ? true : false}
//                   required
//                   id="category"
//                   onChange={handleChange}
//                   className="form-select py-2"
//                   value={formData.category} // تأكد من تعيين القيمة هنا
//                   aria-label="Default select example"
//                 >
//                   <option value="" disabled>
//                     اختر القسم
//                   </option>
//                   {showCategorie}
//                 </select>
//               </div>
//               <div className="col-sm-6">
//                 <label
//                   className="p-1 fs-5 d-flex align-items-center gap-2"
//                   htmlFor="createdAt"
//                 >
//                   <BsCCircleFill />
//                   تاريخ الانشاء
//                 </label>
//                 <input
//                   className="form-control"
//                   placeholder=" تاريخ الانشاء"
//                   name={"createdAt"}
//                   id="createdAt"
//                   disabled
//                   type="date"
//                   value={isSuccess?convertDateTime(data?.data.createdAt):''}
//                 />
//               </div>
//             </div>
//           </div>

//         {updateeror?.status === 400 && (
//           <span className="w-100 text-center d-block text-danger pt-3">
//             {updateeror?.status === 400 ?'هذا الاسم مستخدم بالفعل':"خطا في الخادم"}
//           </span>
//         )}

//         <button
//         disabled={isLoading || updateloading? true : false}
//           className="btn btn-primary my-4 d-flex align-items-center"
//           type="submit"
//         >
//           {isLoading || updateloading  ? <span className="spinner-border"></span>:
//            <span className="">تعديل</span>}
        
//         </button>
//       </form>

 




//     </div>
    

      
//     );
// }



// export default SubCategory;
