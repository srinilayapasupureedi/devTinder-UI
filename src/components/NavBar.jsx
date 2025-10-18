import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utilis/constants';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utilis/userSlice'; 
import { useState } from 'react';
const NavBar = () => {
  // eslint-disable-next-line no-unused-vars
  const [error,setError]=useState('');
  const user=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try{
      await axios.post(`${BASE_URL}/logout`,{},{withCredentials:true});
     dispatch(removeUser());
      navigate("/login");
    }
    catch(err){
      setError(err.response?.data?.message || 'Logout failed');

    }

    }
  
  return (  
   <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">🧑‍💻DevTinder</Link>
  </div>
  <div className="flex gap-4">
    { user && <div className="dropdown dropdown-end mx-[15px] ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
        <div className="w-10 rounded-full">
          <img
           
            alt="Tailwind CSS Navbar component"
            src={user.profilePicture} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/settings">Settings</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
   </div>
</div>)
};

export default NavBar;