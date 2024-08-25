import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState: [],
  reducers: {
    cartitems: (state, action) => {
  //     const exists = state.find(product => product.productId === action.payload.productId) ;
    
 
  //  if (!exists &&typeof(action.payload) !== 'number') {
  //   console.log(action.payload=== Number);
  //    return [...state, action.payload];
  //  }
   if (typeof(action.payload) === 'number') {
 
    // return action.payload;
    return  action.payload;
  }

    },
  },
});

export const { cartitems } = CartSlice.actions;
export default CartSlice.reducer;
