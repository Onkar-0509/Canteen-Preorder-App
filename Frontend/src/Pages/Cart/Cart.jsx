import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount, URL } = useContext(StoreContext);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='cart mt-[100px] px-4 sm:px-6 lg:px-8'>
      <div className="cart-items">
        <div className="cart-items-title grid grid-cols-[1.5fr_1.5fr_1fr_1fr] sm:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center justify-center text-gray-950 text-[max(1vw,12px)]">
          {windowWidth >= 640 && <p>Item</p>}
          <p>Title</p>
          {windowWidth >= 640 && <p>Price</p>}
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            const image = URL+"/images/" + item.image;
            return (
              <div key={index}>
                <div className='cart-items-title py-2 cart-items-item grid grid-cols-[1.5fr_1.5fr_1fr_1fr] sm:grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center justify-center text-[max(1vw,12px)] mx-[10px] text-black'>
                  {windowWidth >= 640 && <img className='w-[80px] pr-2' src={image} alt="" />}
                  <p>{item.name}</p>
                  {windowWidth >= 640 && <p>₹{item.price}</p>}
                  <p>{cartItem[item._id]}</p>
                  <p>₹{item.price * cartItem[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cursor-pointer pl-8'>X</p>
                </div>
                <hr className='h-[1px]' />
              </div>
            );
          }
          return null; // Return null if the item doesn't match the category
        })}
      </div>

      <div className="cart-bottom mt-[50px] flex flex-col items-center gap-6 w-full max-w-[700px] mx-auto">
        <div className="cart-total flex flex-col gap-4 w-full">
          <b className="text-2xl">Cart Totals</b>
          <div>
            <div className="cart-total-details flex justify-between text-[#555] py-1">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details flex justify-between text-[#555] py-1">
              <p>Platform Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details flex justify-between text-[#555] py-1">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
        </div>

        {/* Centered Button with reduced space */}
        <button
          onClick={() => navigate('/order')}
          className="text-white bg-red-500 w-full sm:w-[200px] p-2 rounded-[4px] cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;