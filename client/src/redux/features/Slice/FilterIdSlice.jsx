import { createSlice } from "@reduxjs/toolkit";

export const FilterIdSlice = createSlice({
  name: "FilterIdSlice",
  initialState: [],
  reducers: {
    FilterValue: (state, action) => {
  
   if (action.payload) {

 
    
    return  action.payload;
  }
return action.payload;
    },
  },
});

export const { FilterValue } = FilterIdSlice.actions;
export default FilterIdSlice.reducer;
