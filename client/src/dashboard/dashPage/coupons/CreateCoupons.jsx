import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import logo from "../../../imges/logo.webp";
import { useNavigate } from "react-router-dom";
import { useCreateOneMutation } from "../../../redux/features/api/apiSlice";
// icons
import { FaImage, FaUser } from "react-icons/fa";

import { ToastContainer } from "react-toastify";
import { errorNotify, infoNotify, successNotify, warnNotify } from "../../../utils/Toast";
import { convertDateTime } from "../../../utils/convertDateTime";

const CreateCoupons = () => {
  const navegate = useNavigate();

  // create one (rtk redux)
  const [
    createOne,
    { error, isLoding, isSuccess },
  ] = useCreateOneMutation();


  const [formData, setFormData] = useState({
    name: "",
    discount: "",
    expires: "",
  
  });
  useEffect(() => {
    if(error?.status ===401){
      warnNotify('انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا')
    }
  },[error?.status])

  // isSuccess
  useEffect(() => {
    if (isSuccess) {
      successNotify(`تمت  التعديل بنجاح`);

      navegate(`/dashboard/coupons`);
    }
  }, [navegate, isSuccess]);

  // handel errors
  useEffect(() => {
if(error){
    if(error.status==400)errorNotify('هذا الاسم موجود بالفعل')
}


  }, [error]);

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

   

    if (
      formData.name == "" &&
      formData.discount == "" &&
      formData.expires == ""   
    ) {
    
     return infoNotify("  يجب تعبئه  المعلومات المطلوبه ");
    }   
    if (convertDateTime(Date.now()) >= convertDateTime(formData?.expires,true)) {
      errorNotify("المدى الخاصة بهذا الكوبون  غير صالحه");
      return;
    }
    if( formData.discount > 0 && formData.discount < 100 ){
      //  send form data to server
      createOne({
        url: `/coupons`,
        body: formData,
        method: "post",
      });
    }else{
      warnNotify('يجب ان تكون الخصم من 0 والى 100');
      return;
    }
  };

  // handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value } || {});
   
  };

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

      <form onSubmit={handleSubmit} className="m-auto p-3">
        <Fade delay={0} direction="up" triggerOnce={true}>
          <div className="w-100 py-2">
            <img
              className="logo rounded  m-auto d-none d-sm-block"
              src={logo}
              alt="Logo"
            />
          </div>
          {
            <h2 className="w-75 text-center m-auto py-2 border-bottom">
              اضافه كود خصم
            </h2>
          }
          <div className="col-md-12 py-2">
            <label
              className="p-1 fs-5 d-flex align-items-center gap-1"
              htmlFor={"name"}
            >
              <FaUser />
              اسم كود الخصم
            </label>

            <input
            required
              disabled={isLoding ? true : false}
              minLength={3}
              maxLength={32}
              className="form-control"
              id={"name"}
              name={"name"}
              type={"Text"}
              placeholder={"ادخل الاسم القسم"}
              value={formData.name || ""}
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
                المبلغ
              </label>
              <input
              required
                disabled={isLoding ? true : false}
                min={1}
                className="form-control"
                id={"discount"}
                name={"discount"}
                type={"number"}
                placeholder={"ادخل المبلغ "}
                value={(formData?.discount && formData?.discount) || ''}
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
                disabled={isLoding ? true : false}
                min={3}
                className="form-control"
                id={"expires"}
                name={"expires"}
                type={"date"}
                required
                placeholder={"  تاريخ الانتهاء  "}
                value={
                  (formData?.expires && convertDateTime(formData?.expires,true)) ||
                  ""
                }
                onChange={handleChange}
              />
            </div>

          </div>


          <button
            disabled={isLoding ? true : false}
            className="btn btn-primary my-4 d-flex align-items-center"
            type="submit"
          >
            {isLoding ? (
              <span className="spinner-border"></span>
            ) : (
              <span className="">اضافه</span>
            )}
          </button>
        </Fade>
      </form>
    </div>
  );
};

export default CreateCoupons;



   
