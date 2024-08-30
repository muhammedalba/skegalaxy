import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateOneMutation,
  useGetOneQuery,
} from "../../../redux/features/api/apiSlice";
import { errorNotify, infoNotify, successNotify } from "../../../utils/Toast";

// icons
import { FaImage, FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { Fade } from "react-awesome-reveal";

const User = () => {
  // Bring the user number Id
  const { userId } = useParams();
  //get data (rtk redux)
  const { isLoading, isSuccess, data, error } = useGetOneQuery(
    `users/${userId}`
  );
  // update data (rtk redux)
  const [
    updateOne,
    {
      error: updateError,
      isLoading: updateLoading,
      isSuccess: updateSuccess,
      data: updatedUser,
    },
  ] = useUpdateOneMutation();
  error&& console.log(error, "error");
  // states
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    active: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isDisabled = isLoading || updateLoading;

  // handel isSuccess  oue error
  useEffect(() => {
    if (isSuccess) {
      setFormData({
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        role: data.data.role,
        active: data.data.active,
      });
    }
    if (updateSuccess) {
      successNotify("تمت التعديل بنجاح");
      navigate("/dashboard/users");
    }
    if (updateError) {
      errorNotify("خطأ في الخادم");
    }
  }, [data, isSuccess, updateSuccess, navigate, updateError, updatedUser]);

  // handleSubmit
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (image) form.append("image", image);
      //  send form data to serve
      updateOne({
        url: `/users/${userId}`,
        body: form,
        method: "put",
      });
    },
    [formData, image, updateOne, userId]
  );

  // handelPassowrd
  const handlePasswordChange = useCallback(() => {
    if (password.length >= 6) {
      updateOne({
        url: `/users/changePassword/${userId}`,
        body: { password },
        method: "put",
      });
    } else {
      infoNotify("كلمة المرور يجب أن تكون أكثر من 6 حروف");
    }
  }, [password, updateOne, userId]);

  // handleChange
  const handleChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    },
    [formData]
  );

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
        <Fade delay={0} direction="up" triggerOnce={true}>
          <div className="w-100 py-2">
            <img
              className="logo rounded m-auto d-none d-sm-block"
              src={
                isSuccess && !preview
                  ? `${data?.imageUrl}/${data?.data?.image}`
                  : preview
              }
              alt="avatar"
            />
          </div>
          {isSuccess && (
            <h2 className="w-75 text-center m-auto py-2 border-bottom">
              {formData.firstname}
            </h2>
          )}
          <div className="col-md-12 py-2">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="firstname"
            >
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
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="lastname"
            >
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
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="email"
            >
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
              placeholder={isSuccess ? data.data.email : ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 py-2">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="password"
            >
              <MdOutlineEmail />
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
              {isLoading ? (
                <span className="spinner-border"></span>
              ) : (
                "تغيير كلمه المرور"
              )}
            </button>
          </div>
          <div className="col-md-12 py-2">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor="image"
            >
              <FaImage color="var(--spanColor)" fontSize="1rem" /> صورة الشخصية
              (اختياري)
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
          <select
            id="role"
            onChange={handleChange}
            className="form-select my-3 py-2"
            defaultValue={formData.role}
            aria-label="Default select example"
          >
            <option disabled>{formData.role}</option>
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="manger">manger</option>
          </select>
          <select
            id="active"
            onChange={handleChange}
            className="form-select my-3 py-2"
            defaultValue={formData.active}
            aria-label="Default select example"
          >
            <option value="true">اختر الحالة</option>
            <option disabled={formData.active} value="true">
              نشط
            </option>
            <option disabled={!formData.active} value="false">
              غير نشط
            </option>
          </select>
          {error && (
            <span className="w-100 text-center d-block text-danger pt-3">
              {error.status === 400 ? "لايوجد مستخدم" : "خطأ في الخادم"}
            </span>
          )}
          <button
            disabled={isDisabled}
            className="btn btn-primary my-4 d-flex align-items-center"
            type="submit"
          >
            {isDisabled ? <span className="spinner-border"></span> : "تعديل"}
          </button>
        </Fade>
      </form>
    </div>
  );
};

export default User;
