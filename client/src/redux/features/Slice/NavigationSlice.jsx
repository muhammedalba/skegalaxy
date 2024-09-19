import { createSlice } from "@reduxjs/toolkit";

export const NavigationSlice = createSlice({
  name: "NavigationSlice",
  initialState: 1,
  reducers: {
    minusAction: (state, action) => {
    
      return state - action.payload;
    },
    PlusAction: (state, action) => {

      return state + action.payload;
    },
    currentPage: (state, action) => {
      
      return state = action.payload;
    },
  },
});

export const { minusAction, PlusAction,currentPage } = NavigationSlice.actions;
export default NavigationSlice.reducer;
