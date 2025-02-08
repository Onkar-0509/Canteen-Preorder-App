import React, { useState,useEffect, useContext } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import axios from "axios"
import { StoreContext } from '../../Context/StoreContext'
import { toast } from 'react-toastify'

const Loginpopup = ({setShowLogin}) => {
  const[currState,setCurrState]=useState("Sign Up")
  const {setToken} = useContext(StoreContext)

  const [data,setData]  = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
      setData(data=>({...data, [name]:value}))
 }
    
 const url = "http://localhost:3000/api/user"
    const onLogin = async(event)=>{
          event.preventDefault() 

          let newUrl = url

          if(currState==="Login"){
              newUrl += "/login"
          }else{
              newUrl += "/register"
          }

          const response = await axios.post(newUrl,data)
          if(response.data.success){
              setToken(response.data.token);
              localStorage.setItem("token",response.data.token)
              setShowLogin(false)
              // if(currState==="Login"){
              //   toast.success("Login successfully!!!")
              // }
              // else{
              //   toast.success("Sign-up successfully!!")
              // }
             
          }
          else{
            alert(response.data.message)
          }
    }


  return (
    <div className='login-popup absolute z-[1] w-[100%] h-[100%] grid bg-[#00000090]'>
      <form onSubmit={onLogin} className='login-popup-container place-self-center   w-[max(23vw,330px)] text-gray-500 bg-white flex flex-col gap-6 p-[25px_30px] rounded-lg text-sm animate-[fadeIn_0.5s] '>
        <div className="login-popup-title flex justify-between items-center text-black text-[19px] font-semibold">
           <p className='text-center'>{currState}</p>
           <img className='w-[16px] cursor-pointer ' onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-inputs flex flex-col gap-5'>
          {currState==="Login"?<></>:<input onChange={onChangeHandler} className='border border-[#c9c9c9] p-[10px] rounded-[4px] outline-none' name="name" value={data.name} type="text" placeholder='Your Name' required/>}
          
          <input onChange={onChangeHandler} className='border border-[#c9c9c9] p-[10px] rounded-[4px] outline-none' name="email" value={data.email}  type="text" placeholder='Email' required/>
          <input onChange={onChangeHandler} className='border border-[#c9c9c9] p-[10px] rounded-[4px] outline-none' name="password" value={data.password} type="password" placeholder='Password' required/>
        </div>
        <button type='submit' className='text-white bg-red-500 font-[15px] p-[10px]'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition flex gap-2 items-center mt-[-15px]">
          <input type="checkbox" className="checkbox"/>
          <p>Privacy Policy </p>
        </div>
        {
          currState==="Login"?<p>Create a new account? <span className='cursor-pointer text-red-500 font-medium' onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
          <p>Already have an account <span className='cursor-pointer text-red-500 font-medium' onClick={()=>setCurrState("Login")}> Login here</span></p>
        }
        
       
        <div>
          <p></p>
        </div>

      </form>
    </div>
  )
}

export default Loginpopup
