import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// icons
import { FaImage, FaUser } from 'react-icons/fa';
import { MdOutlineEmail } from "react-icons/md";
import { ToastContainer } from 'react-toastify';

import { MdOutlineWifiProtectedSetup } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";



import { useGetOneQuery, useUpdateOneMutation } from '../../redux/features/api/apiSlice';
import { errorNotify, infoNotify, successNotify, warnNotify } from '../../utils/Toast';

import { Fade } from 'react-awesome-reveal';
import Cookies from 'universal-cookie';

const User = () => {
  
  
  const navigate = useNavigate();



  //get data (rtk redux) 
   const { isLoading, isSuccess, data, error } = useGetOneQuery(`users/getMe`);
  
  // update data (rtk redux)
  const [updateOne, { error: updateError, isLoading: updateLoading, isSuccess: updateSuccess, data: updatedUser }] = useUpdateOneMutation();
  // states
  console.log(data);
  console.log(updateError);
  


  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',

  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [password, setPassword] = useState('');


  const isDisabled = isLoading || updateLoading;


 

  // handel isSuccess  oue error
  useEffect(() => {
  

    if (error?.status === 401) {
      infoNotify('يجب عليك تسجيل الدخول');
    }
    if (isSuccess) {
      setFormData({
        firstname: data.data.firstname,
        lastname: data.data.lastname, 
    
      });
    }
    if (updateSuccess) {
      successNotify('تمت التعديل بنجاح');
    
         
    }
    if (updateError) {
     
      errorNotify('خطأ في الخادم');
    }
  }, [data, isSuccess, updateSuccess, navigate, updateError, updatedUser, error?.status, password]);

  // handel isSuccess  oue error
  useEffect(() => {

    if (updateSuccess && password) {
      successNotify('تمت التعديل بنجاح');
       const cookies=new Cookies();
      
        cookies.remove("role");
        cookies.remove("token");
        cookies.remove("refreshToken");
        cookies.remove("image");
navigate('/login');
      
         
    }
    if (updateError) {
     
      errorNotify('خطأ في الخادم');
    }
    if(error?.status===402){
      warnNotify('غير مصرح للمسؤولين دخول الر هنا')
    }
  }, [data, isSuccess, updateSuccess, navigate, updateError, updatedUser, error?.status, password]);


  // handleSubmit
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (image) form.append('image', image);
 
    //  send form data to serve
    updateOne({
      url: `/users/updatLoggedUser`,
      body: form,
      method: 'put',
    });
  }, [formData, image, updateOne, ]);


// handelPassowrd
  const handlePasswordChange = useCallback(() => {
    if (password.length >= 6) {
      updateOne({
        url: `/users/changeMyPassword`,
        body: { password },
        method: 'put',
      });
    
    } else {
      infoNotify('كلمة المرور يجب أن تكون أكثر من 6 حروف');
    }}, [password, updateOne, ]);

  // handleChange
  const handleChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
 
  }, [formData]);



// handle Image Change
  const handleImageChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);




  return (<>
  
  
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

      <form onSubmit={handleSubmit} className="m-auto p-3 mt-5">
      <Fade delay={0} direction='up' triggerOnce={true} cascade>

     

        <div className="w-100 py-2">
          <img
          style={{border:' 0.5rem solid var(--bgColor)'}}
            className="logo rounded-circle m-auto d-block "
            src={isSuccess && !preview ? `${data?.imageUrl}/${data?.data?.image}` : preview}
            alt="avatar"
          />
        </div>

        
        <div className="d-flex align-items-center flex-wrap justify-content-between">
            <Link to={`/orders`} className=' fs-3 m-1'> <MdOutlineWifiProtectedSetup color='green' />  الذهاب الى طلباتي </Link>
        </div>
        <div className="col-md-12 py-2">
          <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor="firstname">
            <FaUser />
            الاسم الاول
          </label>
          <input
            disabled={isDisabled}
            minLength={3}
            maxLength={32}
            className="form-control"
            id="firstname"
            name="firstname"
            type="text"
            placeholder="ادخل الاسم الاول"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 py-2">
          <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor="lastname">
            <FaUser />
            الاسم الثاني
          </label>
          <input
            disabled={isDisabled}
            minLength={3}
            maxLength={32}
            className="form-control"
            id="lastname"
            name="lastname"
            type="text"
            placeholder="ادخل الاسم الثاني"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 py-2">
          <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor="email">
            <MdOutlineEmail />
            الايميل
          </label>
          <input
            disabled
            autoComplete="username"
            className="form-control"
            id="email"
            name="email"
            type="email"
            placeholder={isSuccess ? data.data.email : ''}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-12 py-2">
          <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor="password">
            <RiLockPasswordLine  />
            تغيير كلمه المرور
          </label>
          <input
            disabled={isDisabled}
            maxLength={32}
            minLength={6}
            className="form-control"
            autoComplete="current-password"
            name="password"
            type="password"
            placeholder="تغيير كلمه المرور"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handlePasswordChange}
            type="button"
            disabled={isDisabled}
            className="btn btn-primary my-3 d-flex align-items-center"
          >
            {isLoading ? <span className="spinner-border"></span> : 'تغيير كلمه المرور'}
          </button>
        </div>
        <div className="col-md-12 py-2">
          <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor="image">
            <FaImage color="var(--spanColor)" fontSize="1rem" /> صورة الشخصية 
          </label>
          <input
            disabled={isDisabled}
            className="form-control"
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
          />
        </div>


        {error && (
          <span className="w-100 text-center d-block text-danger pt-3">
            {error.status === 400 ? 'لايوجد مستخدم' : 'خطأ في الخادم'}
          </span>
        )}
        <button
          disabled={isDisabled}
          className="btn btn-primary  my-4 d-flex align-items-center"
          type="submit"
        >
          {isDisabled ? <span className="spinner-border"></span> : 'تعديل'}
        </button>
        </Fade>
      </form>
 
    </div>
  </>);
};

export default User;
