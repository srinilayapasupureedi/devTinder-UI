import { createSlice } from "@reduxjs/toolkit";
const feedSlice=createSlice({
    name:'feed',
    initialState:[],
    reducers:{
       addFeedData:(state,action)=>{
        return action.payload;
       },
       removeFeedData:()=>{
        return [];
       }
    }
});
export const {addFeedData,removeFeedData}=feedSlice.actions;
export default feedSlice.reducer;