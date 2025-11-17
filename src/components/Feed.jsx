import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utilis/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedData } from '../utilis/feedSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import Usercard from './Usercard';
const Feed =() => {
  // eslint-disable-next-line no-unused-vars
  const [error,setError]=useState('');
  const dispatch=useDispatch();
  const userData=useSelector((state)=>state.feed);

  const getFeed=async()=>{
  try{
    if (Array.isArray(userData) && userData.length > 0) return;//code break without 
    const res = await axios.get(`${BASE_URL}/api/user/feed`, {
  withCredentials: true
});

    dispatch(addFeedData(res.data));
  }
  catch(err){

    setError(err.message);
  }
};
useEffect(()=>{
  getFeed();
// eslint-disable-next-line react-hooks/exhaustive-deps
},[]);
 if( !userData || userData.length===0)
  return <h3 className='text-center text-white text-3xl mt-10'>No users found in feed</h3>;

   return (
    userData && (
      <div className="flex justify-center my-10">
        <Usercard user={userData[0]} />
      </div>
    )
  );
};

export default Feed;