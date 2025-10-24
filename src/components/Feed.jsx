import React from 'react'
import axios from 'axios';
import { BASE_URL } from '../utilis/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeedData } from '../utilis/feedSlice';
import { useEffect } from 'react';
import { useState } from 'react';
import Usercard from './UserCard';
const Feed =() => {
  // eslint-disable-next-line no-unused-vars
  const [error,setError]=useState('');
  const dispatch=useDispatch();
  const userData=useSelector((state)=>state.feed);

  const getFeed=async()=>{
  try{
    if (Array.isArray(userData) && userData.length > 0) return;//code break without this


    const res=await axios.get(`${BASE_URL}/user/feed`,{withCredentials:true});
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

  return (
    <div className='flex justify-center'>
      {userData.map((user) => (
        <Usercard  user={user} />
      ))}
    </div>
  )
}

export default Feed;