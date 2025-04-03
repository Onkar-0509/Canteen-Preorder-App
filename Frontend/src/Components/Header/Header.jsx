import React from 'react';

const Header = () => {
  return (
    <div className="header relative w-full h-[34vw] my-[30px] mx-auto bg-[url('header_img.png')] bg-no-repeat bg-cover bg-center 
                    max-[1024px]:h-[45vw] max-[768px]:h-[55vw] max-[480px]:h-[75vw] max-[360px]:h-[85vw]">
      
      <div className="header-contents absolute flex flex-col gap-[1.5vw] items-start max-w-[40%] left-[10vw]  
                      animate-fadeIn max-[1024px]:max-w-[50%] max-[768px]:max-w-[70%] max-[480px]:max-w-[90%] max-[360px]:max-w-[95%] 
                      max-[768px]:left-[1vw] top-[30%]">  
        
        <h1 className="text-white font-semibold text-[max(4vw,28px)] leading-tight 
                      max-[1024px]:text-[max(3.5vw,26px)] 
                      max-[768px]:text-[max(4vw,22px)] 
                      max-[480px]:text-[max(5vw,18px)] 
                      max-[360px]:text-[max(6vw,16px)] 
                      text-left w-full">
          Preorder your <br className="max-[768px]:hidden" /> favourite food here
        </h1>
        
      </div>
      
    </div>
  );
}

export default Header;
