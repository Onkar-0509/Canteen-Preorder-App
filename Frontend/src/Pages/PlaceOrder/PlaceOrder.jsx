import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, URL } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    timeSlot: ""
  });

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const generateTimeSlots = () => {
    let slots = [];
    let startTime = 10 * 60; // 10:00 AM in minutes
    let endTime = 18 * 60; // 6:00 PM in minutes
    let interval = 30; // 30-minute slots

    while (startTime < endTime) {
      let hours = Math.floor(startTime / 60);
      let minutes = startTime % 60;
      let period = hours >= 12 ? "PM" : "AM";
      let formattedHours = hours > 12 ? hours - 12 : hours;
      let formattedMinutes = minutes === 0 ? "00" : minutes;

      slots.push({
        time: `${formattedHours}:${formattedMinutes} ${period}`,
        value: `${formattedHours}:${formattedMinutes} ${period}`
      });
      startTime += interval;
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
    setData(prev => ({ ...prev, timeSlot: slot.value }));
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
      amount: getTotalCartAmount() + 2,
      timeSlot: data.timeSlot
    };

    try {
      const canteenId = localStorage.getItem("canteenId");
      let response = await axios.post(URL + "/api/order/place", { orderData, canteenId }, { headers: { token } });
      if (response.data.success) {
        localStorage.removeItem('canteenId');
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
    <form onSubmit={placeOrder} className="place-order mt-[50px] flex flex-col md:flex-row items-start gap-[10vw]">
      {/* Left Section - Delivery Information */}
      <div className="place-order-left w-full md:w-[100%] md:max-w-[max(25%,400px)]">
        <p className="title font-medium text-[30px] max-[700px]:text-[26px] max-[500px]:text-[22px] max-[400px]:text-[18px] mb-[20px]">Your Information</p>

        <div className="multi-fields flex flex-col md:flex-row gap-2">
          <input required onChange={onChangeHandler} name="firstName" value={data.firstName}
            className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="First Name" />
          <input required onChange={onChangeHandler} name="lastName" value={data.lastName}
            className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="Last Name" />
        </div>

        

        <input required onChange={onChangeHandler} name="phone" value={data.phone}
          className="mb-[15px] w-full p-[7px] rounded-[10px] border outline-red-300" type="text" placeholder="Phone" />

        {/* Time Slot Selection - Appointment Style */}
        <div className="mb-[15px]">
          <label className="block text-gray-700 mb-2">Select Arrival Time</label>
          <div className='flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2 no-scrollbar'>
            {timeSlots.map((slot, index) => (
              <div
                onClick={() => handleTimeSlotSelect(slot)}
                key={index}
                className={`text-center text-sm font-light flex-shrink-0 px-5 py-3 rounded-full cursor-pointer ${selectedTimeSlot?.value === slot.value
                    ? 'bg-red-500 text-white'
                    : 'text-gray-600 border border-gray-300'
                  }`}
              >
                <p>{slot.time.toLowerCase()}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Section - Cart Totals */}
      <div className="place-order-right w-full md:w-[100%] md:max-w-[max(40%,500px)]">
        <div className="cart-total flex flex-col gap-[20px]">
          <b className="text-[30px] max-[700px]:text-[26px] max-[500px]:text-[22px] max-[400px]:text-[18px]">Cart Totals</b>
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