import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/food/list");
      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (err) {
      toast.error("Error fetching food list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post("http://localhost:4000/api/food/delete", { id: foodId });
      if (response.data.success) {
        await fetchList();
        toast.success(response.data.message);
      } else {
        toast.error("Error deleting food item");
      }
    } catch (err) {
      toast.error("Error deleting food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list w-[90%] mx-auto flex flex-col gap-6 mt-5'>
      <p className='text-2xl font-bold text-center'>All Foods List</p>
      <div className="list-table w-full">
        {/* Header Row */}
        <div className="list-table-format grid grid-cols-[1fr_1fr_1fr_0.5fr] md:grid-cols-[1fr_1fr_1fr_1fr_0.5fr]
                        items-center gap-3 p-3 border-b text-lg font-medium bg-gray-100 text-gray-700">
          <b>Image</b>
          <b>Name</b>
          <b className="hidden md:block">Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Food Items */}
        {list.map((item, index) => (
          <div key={index} className="list-table-format grid grid-cols-[1fr_1fr_1fr_0.5fr] md:grid-cols-[1fr_1fr_1fr_1fr_0.5fr]
                                      items-center gap-3 p-3 border-b text-base">
            <img className="w-14 h-14 object-cover rounded-md" src={`http://localhost:4000/images/${item.image}`} alt={item.name} />
            <p className="font-medium">{item.name}</p>
            <p className="hidden md:block">{item.category}</p>
            <p className="text-green-600 font-semibold">₹{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor-pointer text-red-500 hover:text-red-700 font-bold text-lg">
              ✖
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
