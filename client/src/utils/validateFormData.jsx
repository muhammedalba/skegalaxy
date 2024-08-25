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