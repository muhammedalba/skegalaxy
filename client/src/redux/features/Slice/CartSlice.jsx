import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState: [],
  reducers: {
    cartitems: (state, action) => {
  
   if (typeof(action.payload) === 'number') {

 
    
    return  action.payload;
  }

    },
  },
});

export const { cartitems } = CartSlice.actions;
export default CartSlice.reducer;
