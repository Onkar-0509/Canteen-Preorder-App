import { useState } from 'react'
import React  from 'react'
import { assets, menu_list } from '../../assets/frontend_assets/assets'

const ExploreMenu = ({category,setCategory}) => {
 
  return (
    <div id='explore-menu' className='explore-menu flex flex-col gap-5 pb-2 '>
            <h1 className='text-2xl font-medium '>Explore our menu</h1>
            <p className='explore-menu-text max-w-[60%] '>Dive into a world of flavors! From classic favorites to exciting new dishes, our menu has something for every craving.</p>
            <div className="explore-menu-list flex justify-between items-center text-center gap-10 mx-5">
  {menu_list.map((item, index) => (

    <div key={index}  onClick={() =>setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
      className="explore-menu-list-item">
      <img className={`w-[7.5vw] cursor-pointer rounded-full min-w-[80px] ${category === item.menu_name ? "border-[4px] border-red-400 p-[2px]": ""}`}

        src={item.menu_image}
        alt={item.menu_name}
      />
      <p className="mt-2 text-[#747484] text-[16px] cursor-pointer">
        {item.menu_name}
      </p>
    </div>
  ))}
</div>

            <hr className='mx-[20px] h-[2px] bg-[#e2e2e2] border-none' />
    </div>
  )
}

export default ExploreMenu
