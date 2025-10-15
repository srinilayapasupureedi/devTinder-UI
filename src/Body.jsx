import Navbar from 'daisyui/components/navbar'
import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Body = () => {
  return (
     <div className="flex flex-col min-h-screen">
      <NavBar/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default Body;