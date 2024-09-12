import { createSlice } from "@reduxjs/toolkit";

export const Categories = createSlice({
  name: "Categories",
  initialState: [],
  reducers: {
    Categoryitems: (state, action) => {
  
   if (action.payload) {
const Categories = action.payload
   
    return  Categories;
  }


    },
  },
});

export const { Categoryitems } = Categories.actions;
export default Categories.reducer;
