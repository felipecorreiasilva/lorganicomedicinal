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
        
        <div className="flex flex-col m-4 border border-[#0d0c0c] rounded-md w-full bg-[#0d0c0c] ">

            
            {children}

            
            

        </div>
        
            
            
        


    </div>
  )
}

export default Dashboard