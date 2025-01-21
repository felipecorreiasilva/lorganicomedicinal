'use client'
import Dashboard from '@/components/Dashboard'
import EditProductForm from '@/components/EditProductForm'
import SidebarDashboard from '@/components/SidebarDashboard'
import React, { useState } from 'react'

const page = () => {
  
  return (
    <Dashboard >
        
        
      
        
        
        
        <div className={`overflow-hidden flex flex-col m-4 border border-dashboard-900 rounded-md bg-dashboard-900`}>
            
                
              <EditProductForm />
                

        </div>

    </Dashboard>
  )
}

export default page