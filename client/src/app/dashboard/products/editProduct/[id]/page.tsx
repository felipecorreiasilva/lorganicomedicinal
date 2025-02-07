'use client'
import Dashboard from '@/components/Dashboard'
import EditProductForm from '@/components/EditProductForm'
import SidebarDashboard from '@/components/SidebarDashboard'
import React, { useState } from 'react'

const page = () => {
  
  return (
    <Dashboard className='' >
        
        
      
        
        
        
        <div className={`flex flex-col m-auto border border-dashboard-900 rounded-md bg-dashboard-900`}>
            
                
              <EditProductForm />
                

        </div>

    </Dashboard>
  )
}

export default page