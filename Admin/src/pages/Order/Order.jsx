import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error('Error fetching orders');
      }
    } catch (err) {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/order/status", {
        orderId,
        status: event.target.value
      });

      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error('Error updating status');
      }
    } catch (err) {
      toast.error('Error updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4 md:p-6 w-[95%] md:w-[80%] mx-auto text-[#49557e]">
      <h3 className="text-2xl font-bold mb-6 text-center md:text-left">Order Page</h3>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-center border border-gray-300 p-4 rounded-lg bg-gray-50 shadow-sm"
          >
            {/* Order Image */}
            <img src={assets.parcel_icon} alt="Parcel Icon" className="w-16 h-16 object-contain" />

            {/* Order Details */}
            <div className="text-center md:text-left">
              <p className="font-semibold text-gray-800">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className="font-semibold mt-3">{order.address.firstName} {order.address.lastName}</p>
              <div className="text-sm text-gray-600">
                <p>{order.address.street}, {order.address.city}</p>
                <p>{order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p className="mt-2 text-gray-700">{order.address.phone}</p>
            </div>

            {/* Item Count */}
            <p className="text-center md:text-left font-medium">Items: {order.items.length}</p>

            {/* Order Amount */}
            <p className="text-green-600 font-semibold text-lg">₹{order.amount}</p>

            {/* Order Status Dropdown */}
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="bg-white border border-gray-400 rounded-md p-2 outline-none text-sm md:text-base w-full md:w-auto cursor-pointer"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
