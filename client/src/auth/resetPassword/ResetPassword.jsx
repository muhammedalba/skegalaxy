
// icons
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import FormInputs from "../../components/FormInput/FormInputs";
const ResetPassword = () => {
   
  const formData={
    email: "",
    newPassword: "",
  };

    // inputs data
const inputs= [

  { id: "email", type: "email", placeholder: " أدخل الايميل", icon: <MdOutlineEmail color="var(--spancolor)" />, label: "الايميل" },
  { id: "newPassword", type: "password", placeholder: "أدخل كلمه المرورالجديدة", icon: <RiLockPasswordFill color="var(--spancolor)" />, label: "أدخل كلمه المرورالجديدة" },

]
  return (
    <>

  <FormInputs
    InputData={inputs}
    formdata={formData} 
    name='resetPassword'
    rout={'put'}
    title={' اعادة تعيين كلمه المرور'}
    method={'put'}
    path={'resetPassword'}
    />
    </>
  );
};

export default ResetPassword;