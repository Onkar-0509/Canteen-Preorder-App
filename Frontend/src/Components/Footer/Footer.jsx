import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div id='footer' className='footer text-[#d9d9d9] bg-[#323232] flex flex-col items-center justify-center gap-5  px-5 py-[4vw] mt-[100px]  '>
        <div className="footer-content  grid gap-[80px] grid-cols-[2fr_1fr] w-[90%] mx-auto"> 
            <div className="footer-content-left flex flex-col items-start gap-[20px]">
                {/* <img  src={assets.logo} alt="" /> */}
                <p className='text-[#ff2e4aeb] italic text-[34px] font-[550]'>EasyServe</p>
                <p>📦 Fast Delivery | 🍽️ Fresh Ingredients | 💳 Secure Payments</p>
                <div className="footer-social-icons flex gap-3">
                    <img className='w-[40px] mr-[15px] cursor-pointer' src={assets.twitter_icon} alt="" />
                    <img className='w-[40px] mr-[15px] cursor-pointer' src={assets.facebook_icon} alt="" />
                    <img className='w-[40px] mr-[15px] cursor-pointer' src={assets.linkedin_icon} alt="" />

                </div>
            </div>
                
                {/* <div className="footer-content-center flex flex-col items-center gap-[15px]">
                    <h2 className='text-white text-2xl'>COMPANY</h2>
                    <ul>
                        <li className=' list-none mb-[10px] cursor-pointer '>Home</li>
                        <li className=' list-none mb-[10px] cursor-pointer '>About Us</li>
                        <li className=' list-none mb-[10px] cursor-pointer '>Delivery</li>
                        <li className=' list-none mb-[10px] cursor-pointer '>Privacy Policy</li>
                    </ul>

</div> */}
                <div className="footer-content-right flex flex-col items-center gap-[20px]">
                    <h2 className='text-white text-2xl'>GET IN TOUCH</h2>
                    <ul>
                        <li className=' list-none mb-[10px] cursor-pointer '>+91-9322714123</li>
                        <li className=' list-none mb-[10px] cursor-pointer '>easyserve@gmail.com</li>
                    </ul>
                    </div>
                
              </div>
      <hr className='w-[95%] h-[2px] mx-5 bg-gray-700 mt-5' />
      <p className='footer-copyright'>Copyright 2025 @ EasyServe - All right reserved</p>
    </div>
  )
}

export default Footer
