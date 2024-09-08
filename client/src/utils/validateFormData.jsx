import { parsePhoneNumberFromString } from 'libphonenumber-js';

  
  
  // validate FormData
 export const validateFormData = (formData,Company) => {
    const errors = {};
    let phone = '';
  
    
  
    // Check Title
    if (!formData.title || formData.title.trim() === "") {
      errors.title = "يرجى إدخال اسم المستلم أو الشركة.";
  
    }
  
    // Check postalCode and Taxnumber if Company is selected
    if (Company) {
      if (!formData.postalCode || formData.postalCode <= 0) {
        errors.postalCode = "يرجى إدخال الرمز البريدي الصحيح.";
        
        
      }
  
      if (!formData.Taxnumber || formData.Taxnumber <= 0) {
        errors.Taxnumber = "يرجى إدخال الرقم الضريبي الصحيح.";
      }
    }
  
    // Check City
    if (!formData.city || formData.city.trim() === "") {
      errors.city = "يرجى إدخال اسم المدينة.";
  
    }
  
    // Check Area
    if (!formData.Area || formData.Area.trim() === "") {
      errors.Area = "يرجى إدخال اسم المنطقة.";
  
    }
  
    // Check Street
    if (!formData.street || formData.street.trim() === "") {
      errors.street = "يرجى إدخال اسم الشارع.";
  
    }
  
    // Check Phone
    if (formData.phone ) {
       // Parse the phone number using libphonenumber-js
    const phoneNumberObj = parsePhoneNumberFromString(formData.phone, 'SA');


    if (phoneNumberObj && phoneNumberObj.country !== 'SA')  {
      errors.phone = "يرجى إدخال رقم الهاتف الصحيح.";

    }
    if( phoneNumberObj.nationalNumber.length !== 9 && phoneNumberObj.country === 'SA'){
      errors.phone = "يرجى إدخال رقم الهاتف بطول 9 رقم.";
    }

    if( phoneNumberObj&& phoneNumberObj.nationalNumber.length === 9 && phoneNumberObj.country === 'SA'){
     
      phone=phoneNumberObj.number
    }

  
    }else{
      errors.phone = "يرجى إدخال رقم الهاتف.";
    }
  
    // Check Additional Details
    if (formData.detalis && formData.detalis.length > 2000) {
      errors.detalis = "معلومات إضافية يجب أن تكون أقل من 2000 حرف.";
  
    }
  
    return {errors ,phone};
  };


  export const validateCreateProduct = (formData,imageCover) => {
    const errors = {};
  // check imageCover
  if (imageCover && imageCover === null) {
    errors.imageCover = "يرجى إختيار صورة المنتج.";
  }

    // Check Title and description
    if (!formData.title || formData.title.trim() === "") {
      errors.title = "يرجى إدخال اسم المنتج.";
    } else if (formData.title.length < 3) {
      errors.title = "يرجى إدخال اسم منتج اكثر من ثلاث احرف.";
    } else if (formData.title.length > 70) {
      errors.title = "يرجى إدخال اسم منتج اقل من 70 احرف.";
    }
   if (formData.description.length > 2000) {
    errors.title = "يرجى إدخال وصف منتج اقل من 2000 احرف.";
  }
  if (formData.description.length < 15) {
    errors.title = "يرجى إدخال ,وصف منتج اكثر من 15 احرف.";
  }
    // Check Price
    if (formData.price === ''|| formData.price === 0) {
      errors.price = "يجب أن لا يكون السعر فارغ.";
    } else if (+formData.price <= +formData?.priceAfterDiscount) {
      errors.price = "يجب أن لا يكون السعر بعد التخفيض أكبر من السعر.";
    }
  
    // Check Category
    if (formData.category === undefined || formData.category === '') {
      errors.category = "يجب أن لا يكون القسم فارغ.";
    }
  
    // Check Brand
    if (formData.brand === undefined || formData.brand === '') {
      errors.brand = "يجب أن لا تكون الشركة فارغة.";
    }
  
    // Check Quantity 
    if (+formData.quantity < 0|| !formData.quantity) {
      errors.quantity = "يجب أن لا يكون الكمية فارغه.";
    }
  
    console.log(errors);
  
    return errors;
  };
  export const validateCreateUser= (formData) => {
    const errors = {};
 

    // Check Title and description
    if (!formData.firstname || formData.firstname.trim() === "") {
      errors.firstname = " يرجى إدخال اسم .";
    } else if (formData.firstname.length < 3) {
      errors.firstname = "يرجى إدخال اسم  اكثر من ثلاث احرف.";
    } else if (formData.firstname.length > 70) {
      errors.firstname = "يرجى إدخال اسم  اقل من 32 احرف.";
    }
    if (!formData.lastname || formData.lastname.trim() === "") {
      errors.lastname = " يرجى إدخال اسم .";
    } else if (formData.lastname.length < 3) {
      errors.lastname = "يرجى إدخال اسم  اكثر من ثلاث احرف.";
    } else if (formData.lastname.length > 70) {
      errors.lastname = "يرجى إدخال اسم  اقل من 32 احرف.";
    }
    // Check email address
    if(!formData.email ) {
      errors.lastname = "يرجى إدخال بريد الكتروني.";
    }
    
    // Check Quantity 
    if (  formData.password !== formData.passwordConfirm ){
     
      errors.quantity = "     كلمة السر غير متطابقة";
    }
  
    console.log(errors);
  
    return errors;
  };