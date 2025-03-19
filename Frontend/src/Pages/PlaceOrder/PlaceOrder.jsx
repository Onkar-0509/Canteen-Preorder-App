import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem,URL } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2
    };

    try {
      let response = await axios.post(URL+"/api/order/place", orderData, { headers: { token } });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order mt-[100px] flex flex-col md:flex-row items-start gap-[15vw]">
      {/* Left Section - Delivery Information */}
      <div className="place-order-left w-full md:w-[100%] md:max-w-[max(30%,500px)]">
        <p className="title font-medium text-2xl mb-[50px]">Delivery Information</p>

        <div className="multi-fields flex flex-col md:flex-row gap-2">
          <input required onChange={onChangeHandler} name="firstName" value={data.firstName}
            className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName}
            className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="Last Name" />
        </div>

        <input required onChange={onChangeHandler} name="email" value={data.email}
          className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="email" placeholder="Email Address" />
        <input required onChange={onChangeHandler} name="street" value={data.street}
          className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="Street" />

        <div className="multi-fields flex flex-col md:flex-row gap-2">
          <input required onChange={onChangeHandler} name="city" value={data.city}
            className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="City" />
          <input required onChange={onChangeHandler} name="state" value={data.state}
            className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="State" />
        </div>

        <div className="multi-fields flex flex-col md:flex-row gap-2">
          <input required onChange={onChangeHandler} name="pincode" value={data.pincode}
            className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="Pin-Code" />
          <input required onChange={onChangeHandler} name="country" value={data.country}
            className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="Country" />
        </div>

        <input required onChange={onChangeHandler} name="phone" value={data.phone}
          className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="Phone" />
      </div>

      {/* Right Section - Cart Totals */}
      <div className="place-order-right w-full md:w-[100%] md:max-w-[max(40%,500px)]">
        <div className="cart-total flex flex-col gap-[20px]">
          <b className="text-2xl">Cart Totals</b>
          <div>
            <div className="cart-total-details flex justify-between text-[#555] py-2">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <hr />

            <div className="cart-total-details flex justify-between text-[#555] py-2">
              <p>Platform Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />

            <div className="cart-total-details flex justify-between text-[#555] py-2">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          {/* Centered Button on Mobile, Original Placement on Desktop */}
          <div className="w-full flex justify-center md:justify-start">
            <button type="submit" className="text-white bg-red-500 w-[max(14vw,200px)] p-2 rounded-[4px] cursor-pointer">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
