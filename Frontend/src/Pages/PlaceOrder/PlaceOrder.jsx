import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'

const PlaceOrder = () => {
  const {getTotalCartAmount} = useContext(StoreContext);
  return (
   <form className='place-order mt-[100px] flex items-start gap-[50px] justify-between'>
    <div className="place-order-left w-[100%] max-w-[max(30%,500px)] ">
      <p className='title font-medium text-2xl mb-[50px]'>Delivery Information</p>

      <div className="multi-fields flex gap-2">
        <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="text"  placeholder='First Name'/>
        <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="text" placeholder='Last Name' />
      </div>
     
     <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="email" placeholder='Email Address'/>
     <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="text" placeholder='Street' />

     <div className="multi-fields flex gap-2">
        <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="text"  placeholder='City'/>
        <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="text" placeholder='State' />
      </div>

      <div className="multi-fields flex gap-2">
        <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="text"  placeholder='Pin-Code'/>
        <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="text" placeholder='Country' />
      </div>
     <input className='mb-[15px] w-[100%] p-[7px] rounded-[10px] border  outline-red-300' type="text" placeholder='Phone' />
    </div>

    <div className="place-order-right w-[100%] max-w-[max(40%,500px)]"></div>
    <div className="cart-total flex-1 flex flex-col  gap-[20px]">
            <b className='text-2xl'>Cart Totals</b>
          <div>

          <div className="cart-total-details flex justify-between text-[#555] py-2">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>

          <hr/>

          <div className="cart-total-details flex justify-between text-[#555] py-2">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />

          <div className="cart-total-details flex justify-between text-[#555] py-2">
          <b>Total</b>
          <b>${ getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>

         
          </div>
          <button className='text-white bg-red-500 w-[max(14vw,200px)] p-2 rounded-[4px] cursor-pointer ml-40 mt-7'>Processed to Payment</button>
         </div>
   </form>
  )
}

export default PlaceOrder
