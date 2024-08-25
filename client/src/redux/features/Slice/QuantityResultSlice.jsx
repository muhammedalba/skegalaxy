import { createSlice } from "@reduxjs/toolkit";

export const QuantityResultSlice = createSlice({
    name: 'QuantityResultSlice',
    initialState:[ ],
    reducers: {
      Results: (state, action) => {
            return action.payload; 
          
        },
        
}})
export const {Results}= QuantityResultSlice.actions;
export default QuantityResultSlice.reducer;