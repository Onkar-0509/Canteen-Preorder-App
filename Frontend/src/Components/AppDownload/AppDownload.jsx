import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div id='app-download' className='app-download m-auto mt-[100px] font-medium text-[30px] text-center'>
      <p>For Better Experience Download <br /> EasyServe App</p>
      <div className='flex justify-center gap-[10px] mt-[40px]'>
        <img className='w-[140px] max-w-[180px] cursor-pointer hover:scale-105' src={assets.play_store} alt="" />
        <img className='w-[120px] max-w-[180px] cursor-pointer hover:scale-105' src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
