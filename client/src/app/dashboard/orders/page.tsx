// import SidebarDashboard, { SidebarItem } from '@/components/SidebarDashboard'
import Dashboard from '@/components/Dashboard'
import SidebarDashboard from '@/components/SidebarDashboard'
import TableOrders from '@/components/TableOrders'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <Dashboard className='overflow-x-auto scrollbar-none'>
        
        
        <div className="flex flex-col m-4 border border-[#0d0c0c] rounded-md bg-[#0d0c0c] ">

            
            {/* Search  */}

            
            <TableOrders/>

        </div>
        
            
            
        


    </Dashboard>
  )
}

export default page