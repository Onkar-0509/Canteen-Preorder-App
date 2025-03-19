import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="food-display mt-7">
                <h2 className='text-2xl md:text-3xl font-medium text-center'>Top dishes near you</h2>
                <div className="food-display-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 row-gap-[50px] mt-7">
                    {food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return (
                                <FoodItem
                                    key={index}
                                    id={item._id}
                                    price={item.price}
                                    name={item.name}
                                    description={item.description}
                                    image={item.image}
                                />
                            );
                        }
                        return null; // Return null if the item doesn't match the category
                    })}
                </div>
            </div>
        </div>
    );
};

export default FoodDisplay;