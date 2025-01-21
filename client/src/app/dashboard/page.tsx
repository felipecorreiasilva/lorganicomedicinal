'use client'
import SidebarDashboard from '@/components/SidebarDashboard'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaChartLine, FaMoneyBill, FaUsers } from 'react-icons/fa'
import { GoPackageDependents } from 'react-icons/go'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { MdSpaceDashboard } from 'react-icons/md'

const page = () => {
  return (
    <div className='flex bg-[#050505] h-screen'>
        
        <SidebarDashboard />
        <div className="bg-[#0d0c0c]"></div>


    </div>
  )
}

export default page