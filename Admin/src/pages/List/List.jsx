import React, { useEffect, useState } from 'react'
import axios from "axios";
import {toast} from 'react-toastify'


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

  useEffect(()=>{
      fetchList();
  },[])

  return (
    <div>
       
    </div>
  )
}

export default List
