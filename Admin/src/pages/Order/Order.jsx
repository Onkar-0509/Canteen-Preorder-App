import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get("http://localhost:4000/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else {
      toast.error('Error');
    }
  };

 const statusHandler = async(event,orderId) =>{
     
      const response = await axios.post("http://localhost:4000/api/order/status",
      {orderId,
      status:event.target.value})

      if(response.data.success){
         await fetchAllOrders();
      }
 }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-6 w-[80%] text-[#49557e]">
      <h3 className="text-2xl font-bold mb-6">Order Page</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start border border-red-500 p-5 rounded-lg text-[#49557e]"
          >
            <img src={assets.parcel_icon} alt="" className="w-15" />
            <div>
              <p className="font-semibold text-[#49557e]">
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
              <p className="font-semibold mt-6 mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="space-y-1">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="mt-2">{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>
            ₹
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="bg-red-100 border border-red-500 rounded-md p-2 outline-none"
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