import React from 'react'
import '../index.css';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser }  from '../utilis/userSlice'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utilis/constants';
const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [email ,setEmail]=useState('srinilayap@gmail.com');
  const [password ,setPassword]=useState('SudhaRamu@292');

  const handleLogin=async()=>{
    try{
          const res=await axios.post(`${BASE_URL}/login`,{
        email,
        password
    },{withCredentials:true});
    console.log(res.data);
    dispatch(addUser(res.data));
    alert('Login successful');
    navigate('/');
  }
  catch(err){
    console.log(err);
    alert('Login failed. Please try again.');
  }
};
  return (
    <div className=' flex justify-center my-[25px] '>
   <div className="card bg-base-300 w-96 shadow-sm">
  <div className="card-body">
    <h2 className="card-title flex justify-center">Login </h2>
 <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
  <legend className=" text-sm bg-base-200">Email</legend>
  <input
    type="text"
    value={email}
    placeholder="Enter your email"
    className="input input-bordered w-full bg-base-100 border-2 border-base-300  mt-2 placeholder:text-gray-400"
    onChange={(e)=>{setEmail(e.target.value)}}
  />
  </fieldset>
 <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
  <legend className=" text-sm bg-base-200">Password</legend>
  <input
    type="text"
    value={password}
    placeholder="Enter your password"
    className="input input-bordered w-full bg-base-100 border-2 border-base-300  mt-2 placeholder:text-gray-400"
    onChange={(e)=>setPassword(e.target.value)}
  />
  </fieldset>
    <div className="card-actions justify-center">
      <button className="btn btn-primary " onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
};

export default Login;