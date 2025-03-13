import React, { useContext, useState } from 'react'

import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

 
const Navbar = ({setShowLogin}) => {
  const [menu,setMenu] = useState("");
  const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

  const navigate = useNavigate();
  const logout=()=>{
        localStorage.removeItem("token")
        setToken("");
        navigate("/")
  }
  return (
    <div className='navbar flex px-5 py-3 justify-between items-center'>
      {/* <Link to='/'><img className=' h-30 w-[160px]' src={assets.logo} alt="" /> </Link> */}
      <Link to='/'><p className='text-[#ff2e4aeb] italic text-[34px] font-[550]'>SpeedyServe</p></Link>
      
      
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
        {
  !token ? (
    <button
      onClick={() => setShowLogin(true)}
      className="text-[16px] text-[#49557e] bg-transparent border border-[#48484f] rounded-full px-5 py-1 cursor-pointer hover:bg-[#fff4f2] transition-all duration-300"
    >
      Sign In
    </button>
  ) : (
    <div className="relative group">
      {/* Profile Icon */}
      <img src={assets.profile_icon} alt="Profile" className="cursor-pointer" />

      {/* Centered Dropdown */}
      <ul className="hidden absolute left-1/2 -translate-x-1/2 group-hover:flex flex-col gap-2.5 bg-[#fff2ef] p-2 rounded-lg border border-[tomato] shadow-lg outline outline-2 outline-white list-none min-w-[130px] z-10">
        <li
          onClick={() => navigate('/myorders')}
          className="flex items-center gap-2 cursor-pointer hover:text-[#FF4C24] px-1 rounded-md transition-all duration-200"
        >
          <img className="w-5" src={assets.bag_icon} alt="Orders" />
          <p>Orders</p>
        </li>
        <hr className="border-t border-gray-300" />
        <li
          onClick={logout}
          className="flex items-center gap-2 cursor-pointer hover:text-[#FF4C24] px-1 rounded-md transition-all duration-200"
        >
          <img className="w-5" src={assets.logout_icon} alt="Logout" />
          <p>Logout</p>
        </li>
      </ul>
    </div>
  )
}


           
      </div>
      
    </div>
  )
}

export default Navbar
