import { createSlice } from "@reduxjs/toolkit";

export const SerchSlice = createSlice({
    name: 'SerchSlice',
    initialState:[ ],
    reducers: {
      searchItem: (state, action) => {

            return action.payload; 

        },
        
}})
export const {searchItem}= SerchSlice.actions;
export default SerchSlice.reducer;