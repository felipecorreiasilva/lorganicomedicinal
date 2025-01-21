'use client'
import SidebarDashboard from '@/components/SidebarDashboard'
import React, { useState } from 'react'

const page = () => {

    const [image, setImage] = useState('bb')

  return (
    <div className='flex'>
        
        {/* <SidebarDashboard/> */}
        
        <div className="flex flex-col m-4 border border-[#0d0c0c] rounded-md w-full bg-[#0d0c0c]">
            
                <p>{image}</p>
                <input 
                id='dropzone-file'
                className='hidden'
                onChange={(e)=>{
                    setImage('cc')
                    
                }}
                type="file" />

                <label htmlFor="dropzone-file" className='cursor-pointer'>
                    <div className="bg-slate-300 p-32"></div>
                </label>

        </div>

    </div>
  )
}

export default page