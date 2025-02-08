import React, { useEffect } from 'react'
import {useSearchParams} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
 
    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const navigate = useNavigate();

    const verifyPayment= async()=>{
        const response = await axios.post("http://localhost:3000/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate('/myorders');
        }
        else{
            navigate('/')
        }
    }

    useEffect(()=>{
        verifyPayment();
    })

  return (
    <div className='verify min-h-[60vh] grid'>
        <div className="w-[100px] h-[100px] place-self-center border-[5px] border-[#bdbdbd] border-t-[5px] border-t-[tomato] rounded-full animate-rotate">
            
        </div>

  </div>
  )
}

export default Verify
