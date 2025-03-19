import { useState } from 'react';
import React from 'react';
import { assets, menu_list } from '../../assets/frontend_assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div id='explore-menu' className='explore-menu flex flex-col gap-5 pb-2'>
      <h1 className='text-[20px] md:text-[25px] font-medium'>Explore our menu</h1>
      <p className='explore-menu-text max-w-[90%] md:max-w-[60%] text-center mx-auto text-[16px]'>
        Dive into a world of flavors! Our menu has something for every craving.
      </p>
      <div className="explore-menu-list flex flex-wrap justify-center items-center text-center gap-5 mx-5">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
            className="explore-menu-list-item flex flex-col items-center cursor-pointer"
          >
            <img
              className={`w-[20vw] md:w-[15vw] lg:w-[10vw] cursor-pointer rounded-full min-w-[80px] ${category === item.menu_name ? "border-[4px] border-red-400 p-[2px]" : ""}`}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p className="mt-2 text-[#747484] text-[14px] md:text-[16px] cursor-pointer">
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>

      <hr className='mx-[20px] h-[2px] bg-[#e2e2e2] border-none' />
    </div>
  );
}

export default ExploreMenu;