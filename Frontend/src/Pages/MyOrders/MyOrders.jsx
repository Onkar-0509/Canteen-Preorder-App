import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/frontend_assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { token,URL } = useContext(StoreContext);

  const fetchOrders = async () => {
    const response = await axios.post(URL+"/api/order/userorders", {}, { headers: { token } });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders mt-12 mb-12 px-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="container flex flex-col gap-5 mt-8">
        {data.map((order, index) => (
          <div
            key={index}
            className="my-orders-order grid grid-cols-6 gap-8 items-center text-sm p-3 border border-red-500 text-gray-600 rounded-lg
                      max-sm:grid-cols-1 max-sm:gap-4 max-sm:text-center"
          >
            {/* Parcel Icon */}
            <img src={assets.parcel_icon} alt="" className="w-12 max-sm:justify-self-center" />

            {/* Order Items */}
            <p className="max-sm:col-span-1">
              {order.items.map((item, idx) => (
                <span key={idx}>
                  {item.name} x {item.quantity}
                  {idx !== order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>

            {/* Order Amount */}
            <p>₹{order.amount}.00</p>

            {/* Number of Items */}
            <p>Items: {order.items.length}</p>

            {/* Order Status */}
            <p>
              <span className="text-red-500">&#x25cf;</span> <b className="font-medium">{order.status}</b>
            </p>

            {/* Track Order Button */}
            <button
              onClick={fetchOrders}
              className="bg-red-100 py-3 rounded-md cursor-pointer text-gray-600 hover:bg-red-200 transition-colors
                        max-sm:w-full max-sm:py-2"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;