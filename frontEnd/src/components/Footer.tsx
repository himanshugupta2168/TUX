import React from 'react'

const Footer = () => {
  return (
    <div className=' hidden px-20 bg-neutral-950 text-white w-full  md:flex pb-8'>
        <div className='h-full flex-1'>
            <h1 className='text-3xl text-violet-800 font-bold'>Dastaan</h1>
            <p className='text-gray-400 mt-28'>© Copyright 2024. All Rights Reserved.</p>
        </div>
        <div className='flex-1 flex justify-around'>
            <div className='flex flex-col gap-6'>
                <h2>COMPANY </h2>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Features</p>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Pricing</p>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Affilaite Programs</p>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Press Kit</p>
            </div>
            <div className='flex flex-col gap-6'>
                <h2>SUPPORT</h2>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Account</p>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Help</p>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Contact Us</p>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Customer Support</p>
            </div>
            <div className='flex flex-col gap-6'>
                <h2>LEGALS</h2>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Terms and Conditons</p>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>privacy Policy</p>
                <p className='text-gray-400 text-sm cursor-pointer hover:text-white'>Liscencing</p>
            </div>
        </div>
    </div>
  )
}

export default Footer