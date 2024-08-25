


import  { useEffect, useState } from 'react';

import logo from '../../../imges/logo.webp'
import {  useNavigate, useParams } from 'react-router-dom';
import { useUpdateOneMutation, useGetOneQuery } from '../../../redux/features/api/apiSlice';
// icons
import { FaImage, FaUser } from 'react-icons/fa';

import { ToastContainer} from 'react-toastify';
import { errorNotify, infoNotify, successNotify } from '../../../utils/Toast';
import { Fade } from 'react-awesome-reveal';


const Brand = () => {
    const navegate=  useNavigate();
  // Bring the brand number Id 
  const {brandId} = useParams();

  //get data (rtk redux) 
  const {isLoading,isSuccess,data, error}=useGetOneQuery(`brands/${brandId}`);

// update data (rtk redux)
  const [ updateOne,{error:eror,isLoading:loading,isSuccess:success,data:brand}]=useUpdateOneMutation();

  eror && console.log(eror?.data,'eror brand');
  const [formData,setFormData]=useState({
    name:'',
 })
//  state
 const [Image,setImage]=useState(null);
 const [preview, setPreview] = useState(null);
 const [changed, setchanged] = useState(false);

  





  // isSuccess 
useEffect(()=>{
  if(isSuccess){
   setFormData({name:data.data.name})

  }
  if(success){
    successNotify(`تمت  التعديل بنجاح`,)
  
    navegate(`/dashboard/brands`)
  }
},[brand, isSuccess, success, navegate, data?.data.name])

// handel errors
useEffect(()=>{
  
if(eror){
    if(eror?.status === 400){
      infoNotify('هذا الاسم مستخدم بالفعل')
   
      }else{
        errorNotify(` خطا في الخادم`)
        
      }
}
},[eror])
  
// handleSubmit
const handleSubmit=(e)=>{
  e.preventDefault();

  if(changed || Image){
        // handel form data
       const form = new FormData();
       changed &&   Object.keys(formData).forEach((key) => form.append(key, formData[key]));
       if (Image){ form.append("image", Image);}
   
       //  send form data to server
       updateOne({
         url:`/brands/${brandId}` ,
         body: form ,
         method: 'put',
       });
  }else{ 
    infoNotify(' يجب تعبئه الاسم او الصورة')

    
  }

   
 
}


 // handleChange
const handleChange=(e)=>{
  setchanged(true)
  setFormData({...formData,[e.target.id]:e.target.value})
 }


//  handle Image Change
 const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setImage(file);
      const reader = new FileReader();
      // عرض المعاينة عند انتهاء القراءة
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



    return (

    <div className="container pt-5">
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
   

   
      <form 
      onSubmit={handleSubmit} 
      className="m-auto p-3">
         <Fade delay={0} direction='up' triggerOnce={true} cascade  damping={0.1}>
        <div className="w-100 py-2">
          <img
            className="logo m-auto d-none d-sm-block"
            src={isSuccess && !preview ?`${data?.imageUrl}/${data?.data?.image}`:preview||logo}
            
            alt="brand"
          />
        </div>
      { isSuccess && <h2 className="w-75 text-center m-auto py-2 border-bottom">
          {data.data.name}   
          </h2>}
        <div className="col-md-12 py-2">
            <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor={"name"}>
              <FaUser />
            اسم الشركه     
            </label>

            <input
              disabled={isLoading || loading ? true : false}
              
              minLength={ 3}
              maxLength={32}
              className="form-control"
              id={'name'}
              name={'name'}
              type={'Text'}
              placeholder={"ادخل الاسم الشركه"}
              value={ formData.name}
              onChange={handleChange}
              
        
            />
        </div>
               
        <div className="col-md-12 py-2">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor="image"
              >
                <FaImage color="var(--spanColor)" fontSize="1rem" /> صورة
                الشركه (اختياري)
              </label>
              <input
                disabled={isLoading || loading ? true : false}
                className="form-control"
                accept="image/*" 
                id="image"
                name="image"
                type="file"
                onChange={ handleImageChange}
              />
        </div>


        {error && (
          <span className="w-100 text-center d-block text-danger pt-3">
            {error.status=== 400?'لايوجد مستخدم  ':"خطا في الخادم"}
          </span>
        )}

        <button
        disabled={isLoading || loading? true : false}
          className="btn btn-primary my-4 d-flex align-items-center"
          type="submit"
        >
          {isLoading || loading  ? <span className="spinner-border"></span>:
           <span className="">تعديل</span>}
        
        </button>
        </Fade>
      </form>

 




    </div>
    

      
    );
}



export default Brand;
