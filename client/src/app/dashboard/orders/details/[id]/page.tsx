import Dashboard from '@/components/Dashboard'
import DetailsOrders from '@/components/DetailsOrders'
import React from 'react'

const page = () => {
  return (
    <Dashboard className='overflow-x-auto scrollbar-none'>
        
        
        <div className="flex flex-col m-4 border border-[#0d0c0c] rounded-md bg-[#0d0c0c] ">
          <DetailsOrders/>
        </div>
        
            
            
        


    </Dashboard>
  )
}

export default page