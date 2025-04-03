import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Cart from './Pages/Cart/Cart'
import Footer from './Components/Footer/Footer'
import Loginpopup from './Components/Login-popup/Loginpopup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './Pages/Verify/Verify'
import MyOrders from './Pages/MyOrders/MyOrders'
import FoodList from './Components/FoodList/FoodList'

const App = () => {
  const[showLogin,setShowLogin]=useState(false);
  return (
      
    <>
    <ToastContainer />
    {showLogin?<Loginpopup setShowLogin={setShowLogin}/>:<></>  
    }
    <div className='w-4/5 m-auto'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        <Route path="/food-list/:foodId" element={<FoodList/>} />
      </Routes> 
    </div>
    <Footer/>
    </>
  )
}

export default App