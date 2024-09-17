
    import  { useEffect, useState } from 'react';
    import {Fade} from 'react-awesome-reveal'
    import logo from '../../../imges/logo.webp'
    import {  useNavigate, useParams } from 'react-router-dom';
    import { useUpdateOneMutation, useGetOneQuery } from '../../../redux/features/api/apiSlice';
    // icons
    import { FaImage, FaUser } from 'react-icons/fa';
    
    import { ToastContainer, } from 'react-toastify';
    import { errorNotify, infoNotify, successNotify, warnNotify } from '../../../utils/Toast';
import { convertDateTime } from '../../../utils/convertDateTime';
    
    const Coupon = () => {
        const navegate=  useNavigate();
      // Bring the Category number Id 
      const {couponId} = useParams();
    
      //get data (rtk redux) 
      const {isLoading,isSuccess,data, error}=useGetOneQuery(`coupons/${couponId}`);
    console.log(data);
  
    
    // update data (rtk redux)
      const [ updateOne,{error:updateEror,isLoading:updateLoading,isSuccess:updateSuccess,}]=useUpdateOneMutation();
    
      const [formData,setFormData]=useState({
        name:'',
        discount:"",
        expires:"",
        createdAt:"",
        


     })
    //  state

 
    
    useEffect(() => {
      if(error?.status ===401){
        warnNotify('انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا')
      }
    },[error?.status])
    
    
    // isSuccess 
    useEffect(()=>{
        if(isSuccess){
         
       setFormData({
        name:data.data?.name,
        discount:data.data?.discount,
        expires:data.data?.expires,
        createdAt:data.data?.createdAt        ,
    })
      }
      if(updateSuccess){
      successNotify(`تمت  التعديل بنجاح`);
    
        navegate(`/dashboard/coupons`)
      }
    },[data?.data?.createdAt, data?.data?.discount, data?.data?.expires, data?.data?.name, isSuccess, navegate, updateSuccess])
    
    // handel errors
    useEffect(()=>{
      
    if(updateEror){
        if(updateEror?.status === 400){
            errorNotify('هذا الاسم مستخدم بالفعل');
          }else{
            errorNotify(` خطا في الخادم`);
          }
    }
    },[updateEror])
      
    // handleSubmit
    const handleSubmit=(e)=>{
       e.preventDefault();  
       
       if(convertDateTime(Date.now()),true >= convertDateTime(formData?.expires,true)){
         errorNotify('المدى الخاصة بهذا الكوبون  غير صالحه');
         return;
       }

     
  if(  convertDateTime(Date.now(),true) <= convertDateTime(formData?.expires,true) &&
       formData.name !==''&&
       formData.discount !== "" &&
       formData.discount !== "" &&
       formData.expires !==""&&
       formData.createdAt !==""){
            
        // if( formData.discount > 0 && formData.discount < 100 ){
   //  send form data to server
           updateOne({
             url:`/coupons/${couponId}` ,
             body: formData,
             method: 'put',
           });

        // }else{
        //   warnNotify('يجب ان تكون الخصم من 0 والى 100');
        //   return;
        // }
             
        
       
        
      }else{ 
        
       infoNotify('  يجب تعبئه  المعلومات المطلوبه ')

      }
    
       
     
    }
    
    
     // handleChange
    const handleChange=(e)=>{
 
      setFormData({...formData,[e.target.id]:e.target.value}||{});
    
      console.log(formData.expires);
      
     }
    
    
  
    
    
        return (
    
        <div className="container mt-5 pt-5">
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
                className="logo rounded  m-auto d-none d-sm-block"
                src={logo}
                alt="Logo"
              />
            </div>
          { isSuccess && <h2 className="w-75 text-center m-auto py-2 border-bottom">
              {data.data?.name}   
              </h2>}
            <div className="col-md-12 py-2">
                <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor={"name"}>
                  <FaUser />
                اسم كود الخصم     
                </label>
    
                <input
                  disabled={isLoading || updateLoading ? true : false}
                  
                  minLength={ 3}
                  maxLength={32}
                  className="form-control"
                  id={'name'}
                  name={'name'}
                  type={'Text'}
                  placeholder={"ادخل الاسم القسم"}
                  value={ formData.name || ''}
                  onChange={handleChange}
                  
            
                />
            </div>
                   
                <div className="row">
                    {/* discount */}
                    <div className="col-12 col-sm-6 py-2">
                    <label
                        className="p-1 fs-5 d-flex align-items-center gap-1"
                        htmlFor="discount"
                    >
                        <FaImage color="var(--spanColor)" fontSize="1rem" /> 
                        قيمه الخصم
                    </label>
                    <input
                    disabled={isLoading || updateLoading ? true : false}
                    
                    min={3}
                    
                    className="form-control"
                    id={'discount'}
                    name={'discount'}
                    type={'number'}
                    placeholder={"ادخل المبلغ "}
                    value={formData?.discount && formData?.discount ||0}
                    onChange={handleChange}
                    
                
                    />
                
                    </div>
                    {/* expires */}
                    <div className="col-12 col-sm-6 py-2">
                    <label
                        className="p-1 fs-5 d-flex align-items-center gap-1"
                        htmlFor="expires"
                    >
                        <FaImage color="var(--spanColor)" fontSize="1rem" /> 
                        تاريخ الانتهاء
                    </label>
                    <input
                    disabled={isLoading || updateLoading ? true : false}
                    
                    min={3}
                    
                    className="form-control"
                    id={'expires'}
                    name={'expires'}
                    type={'date'}
                    placeholder={"  تاريخ الانتهاء  "}
                    value={formData.expires && convertDateTime(formData?.expires,true)||''}
                    onChange={handleChange}
                    
                
                    />
                
                    </div>
                    {/* createdAt */}
                    <div className="col-12 col-sm-6 py-2">
                        <label
                            className="p-1 fs-5 d-flex align-items-center gap-1"
                            htmlFor="createdAt"
                        >
                            <FaImage color="var(--spanColor)" fontSize="1rem" /> 
                            تاريخ الانشاء
                        </label>
                        <input
                        disabled={ true }
                        
                        min={3}
                        
                        className="form-control"
                        id={'createdAt'}
                        name={'createdAt'}
                        type={'date'}
                        placeholder={"  تاريخ النشاء  "}
                        value={formData?.createdAt && convertDateTime(formData?.createdAt,true) || ''}
                      
                         />
                
                    </div>
                </div>
    
    
            {error && (
              <span className="w-100 text-center d-block text-danger pt-3">
                {error.status=== 400?'لايوجد مستخدم  ':"خطا في الخادم"}
              </span>
            )}
    
            <button
            disabled={isLoading || updateLoading? true : false}
              className="btn btn-primary my-4 d-flex align-items-center"
              type="submit"
            >
              {isLoading || updateLoading  ? <span className="spinner-border"></span>:
               <span className="">تعديل</span>}
            
            </button>
            </Fade>
          </form>
    
     
    
    
    
    
        </div>
        
    
          
        );
    }
    
    

    

export default Coupon;
