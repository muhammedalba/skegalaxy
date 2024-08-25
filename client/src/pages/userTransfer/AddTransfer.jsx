
import { useEffect, useState } from "react";
import { useCreateOneMutation } from "../../redux/features/api/apiSlice";
import { ToastContainer } from "react-toastify";
import { FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../imges/logo.png";
import { errorNotify, successNotify } from "../../utils/Toast";

const AddTransfer = () => {
  // create category with rtk
  const [createOne, { error, isLoading, isSuccess }] = useCreateOneMutation();
  console.log(error);

  //
  const navigate = useNavigate();
  // states
  const [image, setImage] = useState(null);
  const [Preview, setPreview] = useState(null);
  const [eror, seteror] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
  });

  // handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle Image Change
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount == 0 || image == null) {
      errorNotify("يجب الا يكون المبلغ  فارغ ويجب ارسال اشعار التحويل");
      return;
    } else {
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (image) form.append("image", image);
console.log(formData.amount );
      try {
        await createOne({
          url: "/transfers",
          body: form,
          method: "post",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  //  handel error message
  useEffect(() => {
    if (error) {
      if (error?.status === 400) {
        seteror("لا تستطيع اضافه اموال قبل التحقق من الحوالة السابقه");
        errorNotify("لا تستطيع اضافه اموال قبل التحقق من الحوالة السابقه");
      } else {
        seteror("خطأ في الخادم الداخلي");
        errorNotify("خطأ في الخادم الداخلي");
      }
    }
  }, [error]);
  //  handle  is successful
  useEffect(() => {
    if (!isLoading && isSuccess) {
      successNotify(`تمت العملية بنجاح`);
        navigate("/ProfileAccount");
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
        <div className="w-100 py-2">
          <img
            className="logo m-auto d-none d-sm-block rounded-circle"
            src={Preview ? Preview : logo}
            alt="avatar"
          />
        </div>
        <h2 className="w-75 text-center m-auto py-2 border-bottom">
         اضافه اموال للمحفظه
        </h2>

        {/* ibanname */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="ibanname"
          >
            <FaImage color="var(--spanColor)" fontSize="1rem" />
              اسم المتلقي
          </label>
          <input
            disabled
            className="form-control"
            id="ibanname"
            name="ibanname"
            type="text"
            value={'admin admin'}
          />
        </div>
        {/* iban */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="nibaname"
          >
            <FaImage color="var(--spanColor)" fontSize="1rem" />
              رقم الحساب
          </label>
          <input
            disabled
            className="form-control"
            id="iban"
            name="iban"
            type="text"
           value={'0011 555 444 3333 222'}
          />
        </div>
        {/* amount */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="amount"
          >
            <FaImage color="var(--spanColor)" fontSize="1rem" />
             مبلغ التحويل
          </label>
          <input
            required
       
        
            disabled={isLoading}
            className="form-control"
            id="amount"
            name="amount"
            type="number"
            onChange={handleChange}
          />
        </div>
        {/* imge input   */}
        <div className="col-md-12 py-2">
          <label
            className="p-1 fs-5 d-flex align-items-center gap-1"
            htmlFor="image"
          >
             وصل التحويل (مطلوب) 
          </label>
          <input
          required
            className="form-control"
            id="image"
            name="image"
            type="file"
            onChange={handleImageChange}
          />
        </div>

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
      </form>
    </div>
  );
};

export default AddTransfer;



