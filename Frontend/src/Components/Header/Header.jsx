import React from 'react'

const Header = () => {
  return (
    <div className="header h-[34vw] my-[30px] mx-auto bg-[url('header_img.png')] bg-no-repeat bg-contain ">
      <div className='header-contents absolute flex flex-col gap-[1.5vw] items-start max-w-[40%] bottom-[20%] left-[14vw] animate-fadeIn '>
        <h1 className=' text-white font-medium text-[max(4vw)]'>Order your favourite food here </h1>
        <p className='text-white text-[1vw]'> cumque numquam voluptatum. Delectus aperiam totam ab incidunt nesciunt veniam doloremque quis inventore nece perferendis officia libero temporibus eligendi architecto nostrum consectetur nemo?</p>
        <button className='text-[#747474] font-medium px-[15px] py-[5px] bg-white rounded-[50px]'>View Menu</button>
      </div>
    </div>
  )
}

export default Header
