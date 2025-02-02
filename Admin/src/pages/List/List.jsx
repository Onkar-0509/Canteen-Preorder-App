import React, { useEffect, useState } from 'react'
import axios from "axios";
import {toast} from 'react-toastify'
import {assets} from '../../assets/assets.js'



const List = () => {

  const [list,setList] = useState([]);

  const fetchList = async()=>{
    try{
      const response = await axios.get("http://localhost:3000/api/food/list");
      console.log(response.data);
      if(response.data.success){
         setList(response.data.data)
         
      }
    }catch(err){
        toast.error("Error")
    }
  };

  const removeFood= async(foodId)=>{
      const response = await axios.post("http://localhost:3000/api/food/delete", {id:foodId});
      // console.log(foodId)
      
      if(response.data.success){
        await fetchList()
        toast.success(response.data.message)
      }
      else{
         toast.error("Error");
      }

  }

  useEffect(()=>{
      fetchList();
  },[])

  return (
    <div className='list add w-[100%] ml-5 flex mx-auto flex-col gap-10 mt-5'>
       <p className='text-2xl font-bold ml-8'>All Foods List</p>
        <div className="list-table w-[90%] mx-auto ">
           <div className="list-table-format grid grid-cols-[1fr_1fr_1fr_1fr_0.5fr] max-md:grid-cols-[1fr_3fr_1fr]
                        items-center gap-3 p-[15px] border text-[16px] bg-[#f9f9f9] max-md:hidden
">
             <b>Image</b>
             <b>Name</b>
             <b>Category</b>
             <b>Price</b>
             <b>Action</b>
           </div>
           {list.map((item,index)=>{
                return (
                  <div key={index} className='list-table-format grid grid-cols-[1fr_1fr_1fr_1fr_0.5fr] max-md:grid-cols-[1fr_3fr_1fr]
                            items-center gap-3 p-[15px] border text-[14px]'>
                      <img className='w-[60px]' src={"http://localhost:3000/images/"+item.image} alt="" />
                      <p>{item.name}</p>
                      <p>{item.category}</p>
                      <p>${item.price}</p>
                      <p onClick={()=>removeFood(item._id)} className='cursor-pointer'>X</p>
                  </div>
                )
           })}
        </div>
    </div>
  )
}

export default List
