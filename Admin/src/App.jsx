import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Order from './pages/Order/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on initial load
  const token = localStorage.getItem('canteenToken');
  useEffect(() => {
    
    if (token) {
      setIsLoggedIn(true);
      navigate('/');
    }
  }, [token]);

  return (
    <div className=''>
      <ToastContainer />
      
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          <Navbar setIsLoggedIn={setIsLoggedIn} />
          <hr className='h-1' />
          <div className='app-component flex'>
            <Sidebar />
            <Routes>
              <Route path='/' element={<Add />} />
              <Route path='/add' element={<Add />} />
              <Route path='/list' element={<List />} />
              <Route path='/order' element={<Order />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;