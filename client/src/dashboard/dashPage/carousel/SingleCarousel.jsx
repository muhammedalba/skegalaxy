


import  { useEffect, useState } from 'react';
import {Fade} from 'react-awesome-reveal'

import {  useNavigate, useParams } from 'react-router-dom';
import { useUpdateOneMutation, useGetOneQuery } from '../../../redux/features/api/apiSlice';
// icons
import { FaImage, FaUser } from 'react-icons/fa';

import { ToastContainer, } from 'react-toastify';
import { errorNotify, infoNotify, successNotify } from '../../../utils/Toast';


const SingleCarousel = () => {
    const navegate=  useNavigate();
  // Bring the carousel number Id 
  const {carouselId} = useParams();

  //get data (rtk redux) 
  const {isLoading,isSuccess,data, error}=useGetOneQuery(`carousel/${carouselId}`);

// update data (rtk redux)
  const [ updateOne,{error:eror,isLoading:loading,isSuccess:success,data:carousel}]=useUpdateOneMutation();

  eror && console.log(eror?.data,'eror carousel');
  const [formData,setFormData]=useState({
    name:'',
 })
//  state
 const [carouselImage,setcarouselImage]=useState(null);
 const [preview, setPreview] = useState(null);
 const [changed, setchanged] = useState(false);




  // isSuccess 
useEffect(()=>{
  if(isSuccess){
   setFormData({name:data.data.name})

  }
  if(success){
  successNotify(`تمت  التعديل بنجاح`);

    navegate(`/dashboard/carousel`)
  }
},[carousel, isSuccess, success, navegate, data?.data.name])

// handel errors
useEffect(()=>{
  
if(eror){
    if(eror?.status === 400){
        errorNotify('هذا الاسم مستخدم بالفعل');
      }else{
        errorNotify(` خطا في الخادم`);
      }
}
},[eror])
  
// handleSubmit
const handleSubmit=(e)=>{
  e.preventDefault();

  if(changed || carouselImage){
        // handel form data
       const form = new FormData();
       changed &&   Object.keys(formData).forEach((key) => form.append(key, formData[key]));
       if (carouselImage){ form.append("carouselImage", carouselImage);}
   
       //  send form data to server
       updateOne({
         url:`/carousel/${carouselId}` ,
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
      setcarouselImage(file);
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
      <Fade delay={0} direction='up' triggerOnce={true}   >

        <div className="w-100 py-2">
          <img
            className="logo rounded  m-auto w-100 d-block"
            src={isSuccess && !preview ?`${data?.imageUrl}/${data?.data?.carouselImage}`:preview}
            
            alt="caousel"
          />
        </div>
      { isSuccess && <h2 className="w-75 text-center m-auto py-2 border-bottom">
          {data.data.name}   
          </h2>}
        <div className="col-md-12 py-2">
            <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor={"name"}>
              <FaUser />
            اسم الصورة     
            </label>

            <input
              disabled={isLoading || loading ? true : false}
              
              minLength={ 3}
              maxLength={32}
              className="form-control"
              id={'name'}
              name={'name'}
              type={'Text'}
              placeholder={"ادخل الاسم الصورة"}
              value={ formData.name}
              onChange={handleChange}
              
        
            />
        </div>
               
        <div className="col-md-12 py-2">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor="carouselImage"
              >
                <FaImage color="var(--spanColor)" fontSize="1rem" /> 
                الصورة 
              </label>
              <input
                disabled={isLoading || loading ? true : false}
                className="form-control"
                accept="carouselImage/*" 
                id="carouselImage"
                name="carouselImage"
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



export default SingleCarousel;
