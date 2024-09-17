import { useState, useRef, useEffect } from "react";
import logo from "../../imges/logo.webp";
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAutapiMutation } from "../../redux/features/api/users/AuthSlice";

import { ToastContainer } from "react-toastify";
//
import "react-toastify/dist/ReactToastify.css";
import { Fade } from "react-awesome-reveal";
import { errorNotify, successNotify } from "../../utils/Toast";




const Verifyresetcode = () => {
  const [Autapi, {  error: eror, isLoading, isSuccess }] = useAutapiMutation();
  
  
  const focus = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [resetCode, setResetCode] = useState("");
  
 
  // if isSuccess handel and  erorrs
  useEffect(()=>{
    if(isSuccess){
  
       
      successNotify("تم التحقق من الرمز بنجاح");
      navigate("/resetPassword", { replace: true });
    
    }
    else if(eror) {
      // sended && isSuccess && setSended(false);
      if (eror?.status === 404) {
          setError("رمز إعادة الضبط غير صالح أو منتهي الصلاحية");
          errorNotify("رمز إعادة الضبط غير صالح أو منتهي الصلاحية");
        } else if (eror?.status === 500) {
          setError("خطأ في الخادم الداخلي");
          errorNotify("خطأ في الخادم الداخلي");
        }
    
        }
  },[isSuccess,eror, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    // Check if the code has been sent
     if (resetCode !== "") {
      Autapi({
        url: "verifyResetCode",
        body: { resetCode },
        method: "post",
      });
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
     
      <form onSubmit={handleSubmit} className="m-auto p-3 mt-5">
      <Fade delay={0} direction='up' triggerOnce={true} cascade>

        <div className="w-100 py-2">
          <img
            className="logo m-auto d-none d-sm-block"
            src={logo}
            alt="avatar"
          />
          <h2 className="w-75 text-center m-auto py-2 border-bottom">
            أدخل الرمز المرسل إلى بريدك الإلكتروني
              
          </h2>
        </div>

        <div className="w-100 py-2 my-3">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor={ "code" }
          >
            <MdOutlineEmail color="var(--spancolor)"  fontSize="1rem" />
            { "الكود"}
          </label>
          <input
            required
            minLength={ 6 }
            className="form-control h-100 py-2"
            ref={focus}
            id={ "code" }
            name={ "code" }
            type={ "text" }
            placeholder={ "ادخل الرمز"}
            value={ resetCode}
            onChange={(e) =>
               setResetCode(e.target.value)
            }
          />
        </div>

        {eror && (
          <span className="w-100 text-center d-block text-danger pt-3">
            {error}
          </span>
        )}

        <button disabled={isLoading ? true : false}
        className="btn btn-primary my-4" type="submit">
          
          {isLoading && <span className="spinner-border"></span>}
          {!isLoading && <span className="">ارسال</span>}
        </button>
        </Fade>
      </form>
    </div>
  );
};

export default Verifyresetcode;
