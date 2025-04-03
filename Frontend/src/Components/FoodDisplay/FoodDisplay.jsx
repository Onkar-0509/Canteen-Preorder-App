import React, { useContext, useEffect, useState } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import { StoreContext } from '../../Context/StoreContext';

const FoodDisplay = ({ foodId }) => {
  const { food_list, canteenInfo } = useContext(StoreContext);
  const [canteenName, setCanteenName] = useState("");

  useEffect(() => {
    if (foodId && canteenInfo) {
      const canteen = canteenInfo.find(c => c._id === foodId);
      if (canteen) {
        setCanteenName(canteen.name);
      }
    }
  }, [foodId, canteenInfo]); // Runs whenever foodId or canteenInfo changes

  localStorage.setItem("canteenId", foodId);

  return (
    <div className='mt-8 text-center' id='food-display'>
      <h2 className='text-[35px] max-[700px]:text-[30px] max-[500px]:text-[26px] max-[400px]:text-[23px] font-bold mb-6 text-center text-gray-800 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent'>{canteenName}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8'>
        {food_list.map((item) => {
          if (foodId === item.canteenId) {
            return (
              <FoodItem
                key={item._id}
                image={item.image}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
