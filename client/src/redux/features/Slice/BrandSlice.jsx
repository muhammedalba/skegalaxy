import { createSlice } from "@reduxjs/toolkit";

export const BrandSlice = createSlice({
  name: "BrandSlice",
  initialState: [],
  reducers: {
    Branditems: (state, action) => {
  
   if (action.payload) {
const BrandSlice = action.payload
   
    return  BrandSlice;
  }


    },
  },
});

export const { Branditems } = BrandSlice.actions;
export default BrandSlice.reducer;
