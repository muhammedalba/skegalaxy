import { createSlice } from "@reduxjs/toolkit";

export const SerchSlice = createSlice({
    name: 'SerchSlice',
    initialState:[ ],
    reducers: {
      searchItem: (state, action) => {

            // console.log(action.payload,"action");
            return action.payload; 
            // console.log(state,"state1");
            // console.log(state,"state2");
        },
        
}})
export const {searchItem}= SerchSlice.actions;
export default SerchSlice.reducer;