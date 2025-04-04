import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { StoreContext } from '../../context/StoreContext';

const List = () => {
  const [list, setList] = useState([]); // Ensure list is always an array
  const { canteenToken,url } = useContext(StoreContext);

  const fetchList = async () => {
    try {
      const response = await axios.post(url+"/api/food/sort", {},
        {
          headers: {
            Authorization: `Bearer ${canteenToken}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      if (response.data.success) {
        setList(response.data.data || []); // Ensure list is an array even if API response is empty
      }
    } catch (err) {
      toast.error("Error fetching food list");
      console.error(err);
      setList([]); // Reset to an empty array if an error occurs
    }
  };

  const remove = async (foodId) => {
    try {
        const response = await axios.post(url+"/api/food/delete", { id: foodId });
        console.log(foodId);
        
        console.log("Delete Response:", response.data);

        if (response.data.success) {
            await fetchList(); // Refresh the food list
            toast.success(response.data.message); // Display success message
        } else {
            toast.error(response.data.message || "Error deleting food item");
        }
    } catch (err) {
        console.error("Error in removeFood:", err);
        toast.error("Error deleting food item");
    }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list w-[90%] mx-auto flex flex-col gap-6 mt-5'>
      <p className='text-2xl font-bold text-center'>All Foods List</p>

      {/* Ensure list exists before accessing length */}
      {list?.length > 0 && (
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
              <img className="w-14 h-14 object-cover rounded-md" src={item.image} alt={item.name} />
              <p className="font-medium">{item.name}</p>
              <p className="hidden md:block">{item.category}</p>
              <p className="text-green-600 font-semibold">₹{item.price}</p>
              <p onClick={() => remove(item._id)} className="cursor-pointer text-red-500 hover:text-red-700 font-bold text-lg">
                ✖
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
