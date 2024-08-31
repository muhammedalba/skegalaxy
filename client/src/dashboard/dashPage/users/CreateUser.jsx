import { useEffect, useState } from "react";
import { useCreateOneMutation } from "../../../redux/features/api/apiSlice";
import {ToastContainer } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import logo from '../../../imges/logo.webp'
import { Fade } from "react-awesome-reveal";
import { errorNotify, successNotify, warnNotify } from "../../../utils/Toast";
const CreateUser = () => {
  const [createOne, { error, isLoading, isSuccess }] = useCreateOneMutation();

    const [preview, setPreview] = useState([]);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [eror, seteror] = useState("");
 
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    active:true,
    role: "user",
  });

  // handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);

      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    if (formData.password === formData.passwordConfirm) {
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (image) form.append("image", image);

      try {
        await createOne({
          url: "/users/adduser",
          body: form,
          method: "post",
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      seteror("");
      errorNotify("كلمة السرغير متطابقة");
      return;
    }
  };
  useEffect(() => {
    if(error?.status ===401){
      warnNotify('انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا')
    }
  },[error?.status])
  useEffect(() => {
    if (error) {
      if (error?.status === 400) {
        seteror("هذا الايميل مستخدم بالفعل");
        errorNotify("هذا الايميل مستخدم بالفعل");
      } else {
        seteror("خطأ في الخادم الداخلي");
        errorNotify("خطأ في الخادم الداخلي");
      }
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      successNotify(`تمت العملية بنجاح`);
      navigate("/dashboard/users");
    }
  }, [isSuccess, isLoading, navigate]);

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
      <form onSubmit={handleSubmit} className="m-auto p-3">
      <Fade delay={0} direction='up' triggerOnce={true}>

      <div className="w-100 py-2">
            <img
              className="logo rounded m-auto d-none d-sm-block"
              src={
                 preview.length>0  ?
                  preview : 
                  logo
              }
              alt="logo"
            />

          </div>
        <h2 className="w-75 text-center m-auto py-2 border-bottom">
          create user
        </h2>
        {/* imge input and get to login st  */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="image"
          >
            <FaImage color="var(--spancolor )" fontSize="1rem"/>
            صورة الشخصية (اختياري)
          </label>
          <input
            className="form-control"
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        {/* email */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="email"
          >
            <MdOutlineEmail color="var(--spancolor )" fontSize="1rem" />
            الايميل
          </label>
          <input
            disabled={isLoading}
            className="form-control"
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            required
          />
        </div>
        {/* firstname */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="firstname"
          >
            <FaUser color="var(--spancolor )" fontSize="1rem" />
            الاسم الاول
          </label>
          <input
            required
            maxLength={32}
            min={3}
            disabled={isLoading}
            className="form-control"
            id="firstname"
            name="firstname"
            type="text"
            onChange={handleChange}
          />
        </div>
        {/* lastname */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="lastname"
          >
            <FaUser color="var(--spancolor )" fontSize="1rem" />
            الاسم الثاني
          </label>
          <input
            required
            maxLength={32}
            min={3}
            disabled={isLoading}
            className="form-control"
            id="lastname"
            name="lastname"
            type="text"
            onChange={handleChange}
          />
        </div>
        {/* password */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="password"
          >
            <RiLockPasswordFill color="var(--spancolor )" fontSize="1rem" />
            كلمة السر
          </label>
          <input
            minLength={6}
            maxLength={32}
            required
            disabled={isLoading}
            className="form-control"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>
        {/* passwordConfirm */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="passwordConfirm"
          >
            <RiLockPasswordFill color="var(--spancolor )" fontSize="1rem" />
            تاكيد كلمه السر
          </label>
          <input
            required
            minLength={6}
            maxLength={32}
            disabled={isLoading}
            className="form-control"
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            onChange={handleChange}
          />
        </div>
          {/* phone */}
        {/* <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="phone"
          >
            <FaImage color="var(--spancolor )" fontSize="1rem" />
             رقم الهاتف
          </label>
          <input
            required
            minLength={9}
            maxLength={13}
            disabled={isLoading}
            className="form-control"
            id="phone"
            name="phone"
            type="tel"
            onChange={handleChange}
          />
        </div> */}
        {/* select */}
        <select
          className="form-select my-3 py-2"
          onChange={handleChange}
          defaultValue={formData.role}
          //  disabled={isLoading&& true}
          aria-label="Default select example"
          name="role"
          id="role"
        >
          <option disabled>اختر الصفه</option>
          <option value="user">user</option>
          <option value="admin">admin</option>
          <option value="manger">manger</option>
        </select>

        <select
          disabled={isLoading && true}
          id="active"
          name="active"
          onChange={handleChange}
          className="form-select my-3 py-2"
          defaultValue={formData.active}
          aria-label="Default select example"
        >
          <option value={"true"}>اختر الحالة</option>
          <option value="true">نشط</option>
          <option value="false">غير نشط</option>
        </select>

        {eror && (
          <span className="w-100 text-center d-block text-danger pt-3">
            {eror}
          </span>
        )}

        <button
          className="btn btn-primary my-4 d-flex align-items-center"
          type="submit"
        >
          ارسال
          {isLoading && <span className="spinner-border"></span>}
          {!isLoading && <span className=""></span>}
        </button>
        </Fade>
      </form>
    </div>
  );
};

export default CreateUser;
