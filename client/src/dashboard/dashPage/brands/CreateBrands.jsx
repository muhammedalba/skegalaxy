    import { useEffect, useState } from "react";
    import { useCreateOneMutation } from "../../../redux/features/api/apiSlice";
    import {ToastContainer } from "react-toastify";
    import { FaImage } from "react-icons/fa";
    import { useNavigate } from "react-router-dom";
    import logo from '../../../imges/logo.webp'
import { errorNotify, successNotify, warnNotify } from "../../../utils/Toast";




const CreateBrands = () => {
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
        name:''
      });

      // handle Change
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

       // handle Image Change
       const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imgeFile = file.type.split("/")[0];
        if (file) {
          if (imgeFile === 'image'||imgeFile === 'webp') {
            setImage(file);
        const reader = new FileReader();
        // عرض المعاينة عند انتهاء القراءة
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);    
      } else {
        return  warnNotify(`صيغه الملف غير صحيحه ${file.type}`);
       
        }
    }}

    
      const handleSubmit = async (e) => {
        e.preventDefault();
     if(formData.name.length < 3|| formData.name.length > 70  ){
      errorNotify('يجب ان يكون الاسم يحتوي على اكثر من 3 احرف واقل من 70')   
    }else{
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (image) form.append("image", image);

      try {
        await createOne({
          url: "/brands",
          body: form,
          method: "post",
        });
      } catch (error) {
        console.error(error);
      }
    }
    



        }
        useEffect(() => {
          if(error?.status ===401){
            warnNotify('انتهت صلاحيه الجلسة الرجاء تسجيل دخول مجددا')
          }
        },[error?.status])
    //  handel error message
      useEffect(() => {
        if (error) {
          if (error?.status === 400) {
            seteror("هذا الاسم مستخدم بالفعل");
            errorNotify("هذا الاسم مستخدم بالفعل");
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
          navigate("/dashboard/brands");
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
              <img className="logo m-auto d-none d-sm-block rounded-circle" src={Preview ?Preview: logo} alt="avatar" />
            </div>
            <h2 className="w-75 text-center m-auto py-2 border-bottom">
              اضافه قسم
            </h2>




            {/* name */}
            <div className="col-md-12 py-2">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor="name"
              >
                <FaImage color="var(--spanColor)" fontSize="1rem" />
                اسم الشركه
              </label>
              <input
                required
                maxLength={70}
                min={3}
                disabled={isLoading}
                className="form-control"
                id="name"
                name="name"
                type="text"
                onChange={handleChange}
              />
            </div>

            {/* imge input   */}
            <div className="col-md-12 py-2">
              <label
                className="p-1 fs-5 d-flex align-items-center gap-1"
                htmlFor="image"
              >
                صورة الشركه (اختياري)
              </label>
              <input
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
    

    

    

export default CreateBrands;
