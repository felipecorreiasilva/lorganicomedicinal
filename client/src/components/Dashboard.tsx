import React, { ReactNode } from 'react'
import SidebarDashboard from './SidebarDashboard'

interface DashboardProps {
    children: ReactNode,
    className?: string
}

const Dashboard = ({children,className}:DashboardProps) => {
  return (
    <div className={`flex w-screen h-screen ${className && `${className}`}`}>
        
        
        <SidebarDashboard/>
        
        <div className="overflow-auto sm:overflow-hidden flex flex-col m-2 sm:m-4 p-2 border border-[#0d0c0c] rounded-md w-full bg-[#0d0c0c] ">

            
            {children}

            
            

        </div>
        
            
            
        


    </div>
  )
}

export default Dashboard