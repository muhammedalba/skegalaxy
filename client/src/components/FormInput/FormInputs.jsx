import { useState, useRef, useEffect } from "react";
import { useAutapiMutation } from "../../redux/features/api/users/AuthSlice";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import logo from "../../imges/avatar.webp";
import { FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
//
import "react-toastify/dist/ReactToastify.css";
import { Fade } from "react-awesome-reveal";
import { errorNotify, successNotify, warnNotify } from "../../utils/Toast";

const FormInputs = ({ formdata, InputData, name, title, method, path }) => {
  const [Autapi, { data: user, error: eror, isLoading, isSuccess }] =
    useAutapiMutation();

  const navigate = useNavigate();
  const focus = useRef(null);
  console.log(user);

  // state
  let [Error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState(formdata);

  // handel Error and focus input
  useEffect(() => {
    focus.current.focus();

    if (eror) {
      // if error

      switch (name) {
        case "resetPassword":
          if (eror?.status === 404) {
            setError("يوجد خطأ في الايميل");
            errorNotify("يوجد خطأ في الايميل");
          } else if (eror?.status === 400) {
            setError("رمز التحقق غير صحيح");
            errorNotify("رمز التحقق غير صحيح");
          } else {
            setError("خطأ في الخادم الداخلي");
            errorNotify("خطأ في الخادم الداخلي");
          }
          break;
        case "login":
          if (eror?.status === 401) {
            setError("يوجد خطأ في الايميل او كلمه المرور");
            errorNotify("يوجد خطأ في الايميل او كلمه المرور");
          } else {
            setError("حدث خطأ غير معروف");
            errorNotify("حدث خطأ غير معروف");
          }

          break;
        case "signup":
          if (eror?.status === 400) {
            setError("هذا الايميل مستخدم بالفعل");
            errorNotify("هذا الايميل مستخدم بالفعل");
          } else {
            setError("خطأ في الخادم الداخلي");
            errorNotify("خطأ في الخادم الداخلي");
          }

          break;
        default:
          setError("حدث خطأ غير معروف");
          errorNotify("حدث خطأ غير معروف");
      }
    }
  }, [eror, name]);
  //  if success

  useEffect(() => {
    // const notify = () =>
    if (isSuccess && user.token) {
      //if res = success set data to cookies
      const cookies = new Cookies();
      cookies.set("role", user?.data.role);
      cookies.set("token", user?.token);
      cookies.set("firstname", user?.data.firstname);
      cookies.set("image", user?.data.image);
      cookies.set("imageUrl", user?.imageUrl);
      //
      successNotify(`تمت ${title} بنجاح`);

      //1- If the user resets the password, go to login page
      //2-If the user is an administrator, go to the control panel
      // const path = ["admin", "manager"].includes(user.data.role)
      //   ? "/"
      //   : "/";

      // name === "resetPassword"
      //   && navigate("/login", { replace: true })
      // :window.location.pathname=path
    }
  }, [isSuccess, user, name, navigate, title]);

  //  handel submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name == "signup" && formData.password !== formData.passwordConfirm) {
      setError("كلمة السر غير متطابقة");
      warnNotify("كلمة السر غير متطابقة");
      return;
    } else {
      // handel form data
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (image) {
        form.append("image", image);
      }

      //  send form data to server
      await Autapi({
        url: path,
        body: name === "signup" ? form : formData,
        method: method,
      });
    }
  };

  // handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //
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
  // showInputs
  const showInputs = InputData.map(({ id, type, placeholder, icon, label }) => (
    <div className="col-md-12 py-2" key={id}>
      <label className="p-1 fs-5 d-flex align-items-center gap-1" htmlFor={id}>
        {icon} {label}
      </label>
      <input
        autoComplete="current-passwordn"
        disabled={isLoading ? true : false}
        required
        minLength={type === "password" ? 6 : 3}
        maxLength={32}
        className="form-control"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={formData[id]}
        onChange={handleChange}
        ref={id === "firstname" || id === "email" ? focus : null}
      />
    </div>
  ));

  return (
    <div className="container pt-5 Auth">
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

      <form onSubmit={handleSubmit} className="m-auto p-3">
        <Fade direction="up" triggerOnce={true} cascade>
          <div className="w-100 py-2">
            <img
              className="logo m-auto d-none d-sm-block"
              src={preview ? preview : logo}
              alt="avatar"
            />
          </div>
          <h2 className="w-75 text-center m-auto py-2 border-bottom">
            {title}
          </h2>
          {showInputs}

          {/* imge input and get to login st  */}
          {name === "signup" && (
            <>
              <div className="col-md-12 py-2">
                <label
                  className="p-1 fs-5 d-flex align-items-center gap-1"
                  htmlFor="image"
                >
                  <FaImage color="var(--spancolor)" fontSize="1rem" /> صورة
                  الشخصية (اختياري)
                </label>
                <input
                  disabled={isLoading ? true : false}
                  className="form-control"
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleImageChange}
                />
              </div>
              <div className="w-100 py-2">
                <span className="p-2 w-100 d-block">
                  هل لديك حساب بالفعل؟
                  <Link className="text-primary" to="/login">
                    {" "}
                    تسجيل دخول
                  </Link>
                </span>
              </div>
            </>
          )}

          {/*get to login end  */}

          {/* Forgot your password && get to signup start*/}
          {name === "login" && (
            <div className="w-100 py-2">
              <span className="p-2 w-100 d-block" htmlFor="password">
                انشاء حساب جديد:
                <Link className="text-primary " to={"/signup"}>
                  {" "}
                  انشاء حساب
                </Link>
              </span>
              <span className="p-2" htmlFor="password">
                هل نسيت كلمة السر؟
                <Link className="text-primary" to={"/forgotPassword"}>
                  {" "}
                  اضغط هنا
                </Link>
              </span>
            </div>
          )}
          {/* Forgot your password && get to signup end */}
          {Error && (
            <span className="w-100 text-center d-block text-danger pt-3">
              {Error}
            </span>
          )}
        </Fade>
        <Fade duration={1500} direction="up" triggerOnce={true} cascade>
          <button
            disabled={isLoading ? true : false}
            className="btn btncolor text-white my-4 d-flex align-items-center"
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

FormInputs.propTypes = {
  path: PropTypes.string,
  method: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  InputData: PropTypes.array,
  formdata: PropTypes.object,
};
export default FormInputs;
