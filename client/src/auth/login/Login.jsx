


import './login.css'
// icons
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import FormInputs from "../../components/FormInput/FormInputs";

const Login = () => {
  // inputs data
const inputs= [

  { id: "email", type: "email", placeholder: "أدخل الايميل", icon: <MdOutlineEmail color="var(--spancolor)" />, label: "الايميل" },
  { id: "password", type: "password", placeholder: "ادخل كلمة المرور", icon: <RiLockPasswordFill color="var(--spancolor)" />, label: "كلمة المرور" },

]

  return (
    <>
    
    <FormInputs formdata={{email: "", password: "",}} 
    InputData={inputs}
    name='login'
    title={'تسجيل دخول'}
    method={'post'}
    path={'login'}
    />
    
    </>)
};

export default Login;
