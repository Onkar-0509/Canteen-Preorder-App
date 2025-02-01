import React, { useState } from 'react'
import { assets } from '../../assets/assets'

import { Link,NavLink } from 'react-router-dom'

const Sidebar = () => {
    const [active,setActive]=useState("")
  return (
    <div className='sidebar w-[18%] min-h-[100vh]  border-t-0 border-[1.5px] border-[#a9a9a9] text-[16px] '>
      <div className="sidebar-options pt-[25px] pl-[20%] flex flex-col gap-10">

      <NavLink to='/add'><div onClick={()=>setActive("add")} className={active==="add"?"sidebar-option bg-orange-100 flex items-center gap-4 border-r-0 border-[1px] border-[#a9a9a9] px-[10px] py-[8px] rounded-l-md cursor-pointer" :"sidebar-option flex items-center gap-4 border-r-0 border-[1px] border-[#a9a9a9] px-[10px] py-[8px] rounded-l-md cursor-pointer"}>
           <img src={assets.add_icon} alt="" />
          <p className='max-md:hidden'>Add items</p>
        </div></NavLink> 

        <NavLink to='/list'><div onClick={()=>setActive("list")} className={active==="list"?"sidebar-option bg-orange-100 flex items-center gap-4 border-r-0 border-[1px] border-[#a9a9a9] px-[10px] py-[8px] rounded-l-md cursor-pointer" :"sidebar-option flex items-center gap-4 border-r-0 border-[1px] border-[#a9a9a9] px-[10px] py-[8px] rounded-l-md cursor-pointer"}>
        <img src={assets.order_icon} alt="" />
        <p className='max-md:hidden'>List items</p>
        </div></NavLink>

        <NavLink to='/order'>
        <div onClick={()=>setActive("order")} className={active==="order"?"sidebar-option bg-orange-100 flex items-center gap-4 border-r-0 border-[1px] border-[#a9a9a9] px-[10px] py-[8px] rounded-l-md cursor-pointer" :"sidebar-option flex items-center gap-4 border-r-0 border-[1px] border-[#a9a9a9] px-[10px] py-[8px] rounded-l-md cursor-pointer"}>
        <img src={assets.order_icon} alt="" />
        <p className='max-md:hidden'>Orders</p>
        </div>
        </NavLink>
      </div>
      
    </div>
  )
}

export default Sidebar


