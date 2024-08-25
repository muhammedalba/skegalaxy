
import "./signUp.css";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import FormInputs from "../../components/FormInput/FormInputs";

const SignUp = () => {

  const formData={
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  }
// inputs data
const inputs= [
  { id: "firstname", type: "text", placeholder: "ادخل الاسم الاول", icon: <FaUser color="var(--spancolor)" />, label: "الاسم الاول" },
  { id: "lastname", type: "text", placeholder: "أدخل الاسم الثاني", icon: <FaUser color="var(--spancolor)" />, label: "الاسم الثاني" },
  { id: "email", type: "email", placeholder: "أدخل الايميل", icon: <MdOutlineEmail color="var(--spancolor)" />, label: "الايميل" },
  { id: "password", type: "password", placeholder: "ادخل كلمة المرور", icon: <RiLockPasswordFill color="var(--spancolor)" />, label: "كلمة المرور" },
  { id: "passwordConfirm", type: "password", placeholder: "ادخل تأكيد كلمة المرور", icon: <RiLockPasswordFill color="var(--spancolor)" />, label: "تأكيد كلمة المرور" }
]


  return (

    <FormInputs formdata={formData}
    InputData={inputs}
    name='signup'
    title={'انشاء حساب جديد '}
    method={'post'}
   path={'signup'}
    />
  );
};

export default SignUp;
