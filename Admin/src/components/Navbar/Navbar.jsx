import React from 'react'
import {assets} from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className='navbar flex justify-between items-center py-2 px-[4%]'>
         <p className='text-[#FF6347] italic text-[34px] font-[550]'>EasyServe</p>
        <img className='profile w-[40px]' src={assets.profile_image} alt="" />
        
      
    </div>
  )
}

export default Navbar
