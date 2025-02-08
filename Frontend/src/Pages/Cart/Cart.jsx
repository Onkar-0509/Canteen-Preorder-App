import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';



const Cart = () => {
  
  const { cartItem, food_list, removeFromCart,getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  return (
    <div className='cart mt-[100px] '>
      <div className="cart-items">
        <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center justify-center text-gray-950 text-[max(1vw,12px)]">
          <p>Item</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          </div>
        <br />
        <hr />
      
     
        

      {food_list.map((item, index) => {

        if(cartItem[item._id]>0){
          const image = "http://localhost:3000/images/"+item.image;
          return (
            
            <div key={index}>
            <div  className='cart-items-title py-2 cart-items-item grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center justify-center text-[max(1vw,12px)] mx-[10px] text-black '>
              <img className='w-[80px] pr-2' src={image} alt="" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartItem[item._id]}</p>
              <p>${item.price*cartItem[item._id]}</p>
              <p onClick={()=>removeFromCart(item._id)} className='cursor-pointer pl-8'>X</p>
            </div>
            <hr className='h-[1px] ' />
            </div>
            
            
          )
        }
        
      })}
     
     </div>
 
        <div className="cart-bottom mt-[80px] flex justify-between gap-[max(12vw,20px)] ">
          <div className="cart-total flex-1 flex flex-col gap-[20px]">
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
          <button onClick={()=>navigate('/order')} className='text-white bg-red-500 w-[max(14vw,200px)] p-2 rounded-[4px] cursor-pointer ml-40'>Processed to checkout</button>
         </div>

         <div className="cart-promocode">
          <div >
            <p className='text-[#555] '>If you have promo code, Enter it here</p>
            <div className="cart-promocode-input  flex gap-3 mt-4">
              <input className='border p-1 bg-transparent pl-10px' type="text" placeholder='enter promo code' />
              <button className='text-white bg-red-500 p-1 w-[max(8vw,100px)] rounded-[4px] '>Submit</button>
            </div>
          </div>
         </div>

         </div>
    </div>
  )
}


export default Cart
