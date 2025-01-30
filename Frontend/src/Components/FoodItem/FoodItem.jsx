import React, { useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {

  const{cartItem,addToCart,removeFromCart}=useContext(StoreContext);
  
  return (
    <div className='food-item w-[100%] mx-auto rounded-2xl shadow-md shadow-black/15 relative'>
      <div className="food-item-img-container relative">
        <img className='w-[100%] rounded-tl-[15px] rounded-tr-[15px] rounded-br-[0px] rounded-bl-[0px] ' src={image} alt="" />

        {
          !cartItem[id] ? <img className='w-[35px] absolute right-2 bottom-3 cursor-pointer' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />:
          <div className='absolute flex gap-[6px] items-center right-2 bottom-3 bg-white px-1 py-1 rounded-3xl'>
             <img className='cursor-pointer w-[27px]'  onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
             <p className=' text-bla ck'>{cartItem[id]}</p>
             <img className='cursor-pointer w-[27px] ' onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }

      </div>
      <div className="food-item-info p-5 ">
         <div className="food-item-name-rating flex justify-between items-center mb-2">
            <p className='text-[16px] font-semibold'>{name}</p>
            <img className='w-[35%]' src={assets.rating_starts} alt="" />
         </div>
         <p className="food-item-desc text-[#676767] text-[14px]">{description}</p>
         <p className='food-item-price text-orange-600 text-[16px] font-medium mx-2 '>${price}</p>
      </div>
     
    </div>
  )
}

export default FoodItem
