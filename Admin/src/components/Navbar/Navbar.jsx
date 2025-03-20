import React from 'react';
import { assets } from '../../assets/assets.js';

const Navbar = () => {
  return (
    <div className='navbar flex justify-between items-center py-2 px-4 md:px-8 lg:px-16'>
      <p className='text-[#ff2e4aeb] italic text-2xl md:text-3xl lg:text-4xl font-semibold'>EasyServe</p>
      <img className='profile w-10 md:w-12 lg:w-14' src={assets.profile_image} alt="Profile" />
    </div>
  );
}

export default Navbar;