import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

 
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("");
  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className='navbar flex px-5 py-3 justify-between items-center'>
      <Link to='/'><img className=' h-30 w-[160px]' src={assets.logo} alt="" /> </Link>
      
      
      <ul className='navbar-menu cursor-pointer flex gap-5 list-none text-[#49557e] text-[16px]'>
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"pb-[1px] border-b-[2px] border-b-[#49557e] ":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"pb-[1px] border-b-[2px] border-b-[#49557e]":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"pb-[1px] border-b-[2px] border-b-[#49557e]":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"pb-[1px] border-b-[2px] border-b-[#49557e]":""}>Contact Us</a>
      </ul>
      <div className='navbar-right flex items-center justify-center gap-8'>
        <img className='w-6 cursor-pointer' src={assets.search_icon} alt="" />
        <div className='navbar-search-icon relative'>
           <Link to='/cart'><img className='w-6 cursor-pointer' src={assets.basket_icon} alt="" /> </Link>  
               <div className={getTotalCartAmount()===0 ? "":"dot absolute min-w-2 min-h-2 rounded-[10px] bg-red-600 top-[-6px] right-[-4px] "}></div>
        </div>
           <button onClick={() => setShowLogin(true)} className='text-[16px] text-[#49557e] bg-transparent border border-[#48484f] rounded-[50px] px-[20px] py-[5px] cursor-pointer hover:bg-[#fff4f2] transition-[3s]'>sign in</button>
      </div>
      
    </div>
  )
}

export default Navbar
