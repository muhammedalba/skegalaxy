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

const ForgotPassword = () => {
  const [Autapi, { data, error: eror, isLoading, isSuccess }] =
    useAutapiMutation();
  console.log(eror);
  console.log(data);
  const focus = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");



  // handel erorrs
  useEffect(() => {
    if (eror) {
      // sended && isSuccess && setSended(false);
      if (eror?.status === 404) {
        setError("لا يوجد مستخدم لديه هذا البريد الإلكتروني");
        errorNotify("لا يوجد مستخدم لديه هذا البريد الإلكتروني");
      } else if (eror?.status === 500) {
        setError("خطأ في الخادم الداخلي");
        errorNotify("خطأ في الخادم الداخلي");
      }
    }
  }, [eror]);

  // if isSuccess handel
  useEffect(() => {
    if (isSuccess) {
      setError("تم ارسال رمز اعادة الضبط الى بريدك الالكتروني");
      successNotify("تم ارسال رمز اعادة الضبط الى بريدك الالكتروني");

      navigate("/verifyresetcode", { replace: true });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the email exists and the code has not been sent
    if (email) {
      Autapi({
        url: "forgotPassword",
        body: { email },
        method: "post",
      });
    }
  };

  return (
    <div className="container pt-5">
      {/*  */}
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
      {/*  */}
      <form onSubmit={handleSubmit} className="m-auto p-3 mt-5">
      <Fade delay={0} direction='down' triggerOnce={true} cascade>

        <div className="w-100 py-2">
          <img
            className="logo m-auto d-none d-sm-block"
            src={logo}
            alt="avatar"
          />
          <h2 className="w-75 text-center m-auto py-2 border-bottom">
            نسيت كلمة المرور
          </h2>
        </div>

        <div className="w-100 py-2 my-3">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor={"email"}
          >
            <MdOutlineEmail color="var(--spancolor)"  fontSize="1rem" />
            الايميل
          </label>
          <input
            required
            // minLength={sended ? 6 : undefined}
            className="form-control h-100 py-2"
            ref={focus}
            id={"email"}
            name={"email"}
            type={"email"}
            placeholder={"أدخل بريدك الإلكتروني"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {eror && (
          <span className="w-100 text-center d-block text-danger pt-3">
            {error}
          </span>
        )}

        <button
          disabled={isLoading ? true : false}
          className="btn btncolor my-4"
          type="submit"
        >
          {isLoading && <span className="spinner-border"></span>}
          {!isLoading && <span className="">ارسال</span>}
        </button>
        </Fade>
      </form>
    </div>
  );
};

export default ForgotPassword;
