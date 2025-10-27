
import './index.css';
import './app.css'
import Body from './components/Body';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import appStore from './utilis/appStore';
import { Provider } from 'react-redux';
import Login from './components/Login';
import Profile from './components/Profile';
import React from 'react';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';   
function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path="/" element={<Body/>}> 
      <Route path='/'element={<Feed/>}/>
      <Route path="connections" element={<Connections/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="profile" element={<Profile/>}/>
      <Route path="requests" element={<Requests/>}/>
      </Route>

    </Routes>
    </BrowserRouter>
    </Provider>
  
     
    </>
  )
}

export default App
