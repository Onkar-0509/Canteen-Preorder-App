import React, { useContext } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'


const FoodDisplay = ({category}) => {
    const{food_list } = useContext(StoreContext)
  return (
    <div>
       <div className="food-display mt-7 ">
        <h2 className='text-2xl font-medium'>Top dishes near you</h2>
        <div className="food-display-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 row-gap-[50px] mt-7">
            {food_list.map((item,index)=>{
              if(category==="All" || category===item.category){
                return <FoodItem key={index} id={item._id} price={item.price} name={item.name} description={item.description} image={item.image}/>
              }
            })}
        </div>
       </div>
    </div>
  )
}

export default FoodDisplay
