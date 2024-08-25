// Converts text into readable date
export const convertDateTime = (isoDate) => {
    const date = new Date(isoDate);
    const localDateTime = date.toISOString().slice(0, 10); // YYYY-MM-DDTHH:MM
  
    return localDateTime;
  };    