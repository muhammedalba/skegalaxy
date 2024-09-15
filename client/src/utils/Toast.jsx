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
   

// إعدادات عامة للإشعارات
// const defaultOptions = {
//   position: "top-center",
//   autoClose: 2000,
//   hideProgressBar: true,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: 0,
//   theme: "colored",
//   transition: Zoom,
// };

// // دالة عامة للإشعارات
// const notify = (message, type) => {
//   const options = { ...defaultOptions };

//   switch (type) {
//     case 'error':
//       toast.error(message, options);
//       break;
//     case 'success':
//       toast.success(message, options);
//       break;
//     case 'info':
//       toast.info(message, options);
//       break;
//     case 'warn':
//       toast.warn(message, options);
//       break;
//     default:
//       toast(message, options);
//   }
// };

// // دوال نوعية للإشعارات
// export const errorNotify = (ERROR) => notify(ERROR, 'error');
// export const successNotify = (success) => notify(success, 'success');
// export const infoNotify = (info) => notify(info, 'info');
// export const warnNotify = (warn) => notify(warn, 'warn');
