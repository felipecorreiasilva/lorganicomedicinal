import Dashboard from '@/components/Dashboard'
import SidebarDashboard from '@/components/SidebarDashboard'
import TableProducts from '@/components/TableProducts'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { HiOutlineSearchCircle } from 'react-icons/hi'

const page = () => {
  return (
    <Dashboard className='overflow-x-auto scrollbar-none'>
        
        
        <div className="flex flex-col m-4 border border-[#0d0c0c] rounded-md bg-[#0d0c0c] ">

            
            {/* Search  */}

            
            <TableProducts/>

        </div>
        
            
            
        


    </Dashboard>
  )
}

export default page