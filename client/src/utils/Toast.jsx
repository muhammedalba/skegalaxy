import { Bounce, toast } from "react-toastify";



  // hande error messge 
   export const errorNotify=  (ERROR) =>{
    toast.error(ERROR, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "colored",
      transition: Bounce,
 
    });}

    export const successNotify=  (success) =>{
        toast.success(success, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          // progress: undefined,
          theme: "colored",
          transition: Bounce,
     
    });}
    
    export const infoNotify=  (info) =>{
        toast.info(info, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Bounce,
    
    });}
    export const warnNotify=  (warn) =>{
        toast.warn(warn, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
        transition: Bounce,
    
    });}
   

