// Converts text into readable date
export const convertDateTime = (isoDate,Notime) => {
  const date = new Date(isoDate);
  
// YYYY-MM-DD
  const localDate = date.toISOString().slice(0, 10); 
  
// HH:MM
  const time = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');

 if( Notime ){ return`${localDate}`} else{return `${localDate} (${time})`;} 
};
