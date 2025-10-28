import { createSlice } from "@reduxjs/toolkit";
const feedSlice=createSlice({
    name:'feed',
    initialState:[],
    reducers:{
       addFeedData:(state,action)=>{
        return action.payload;
       },
       removeUserFromFeed:(state,action)=>{
        const newFeed=state.filter((user)=>user._id!==action.payload);
        return newFeed;
       }
    }
});
export const {addFeedData,removeUserFromFeed}=feedSlice.actions;
export default feedSlice.reducer;