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
  const [email ,setEmail]=useState('');
  const [password ,setPassword]=useState('');
  const [isLoginForm,setLoginForm]=useState(false);
  const [firstName ,setFirstName]=useState('');
  const [lastName ,setLastName]=useState('');
  const handleSignup=async()=>{
    try{
      const res=await axios.post(`${BASE_URL}/signup`,{
        firstName,
        lastName,
        email,
        password
    },{withCredentials:true});
    console.log(res.data);
    dispatch(addUser(res.data.data));  
    navigate('/profile/view');  
  }
  catch(err){
    console.log(err);
    alert('Signup failed. Please try again.');
  }
};
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
    <h2 className="card-title flex justify-center">{isLoginForm ? "Login" : "Signup"}</h2>
   {!isLoginForm &&<>
  <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
    <legend className=" text-sm bg-base-200">firstName</legend>
    <input
      type="text"
      value={firstName}
      placeholder="Enter your firstName"
      className="input input-bordered w-full bg-base-100 border-2 border-base-300  mt-2 placeholder:text-gray-400"
      onChange={(e)=>{setFirstName(e.target.value)}}
    />
    </fieldset>
  <fieldset className="w-full rounded-lg p-4 border-2 border-base-300 bg-base-300 mx-4 my-4">
    <legend className=" text-sm bg-base-200">LastName</legend>
    <input
      type="text"
      value={lastName}
      placeholder="Enter your LastName"
      className="input input-bordered w-full bg-base-100 border-2 border-base-300  mt-2 placeholder:text-gray-400"
      onChange={(e)=>{setLastName(e.target.value)}}
    />
    </fieldset>
    </>}
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
    type="password"
    value={password}
    placeholder="Enter your password"
    className="input input-bordered w-full bg-base-100 border-2 border-base-300  mt-2 placeholder:text-gray-400"
    onChange={(e)=>setPassword(e.target.value)}
  />
  </fieldset>
    <div className="card-actions justify-center">
      <button className="btn btn-primary " onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Signup"}</button>
    </div>
    <p className="text-center cursor-pointer" onClick={()=>{
      setLoginForm((value)=>!value)
    }}>
    {isLoginForm ? "Don't have an account? Signup" : "Already have an account? Login"}</p>
  </div>
</div>
</div>
)};

export default Login;