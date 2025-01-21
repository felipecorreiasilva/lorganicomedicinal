'use client'
import React from 'react'
import { links } from '@/constants/SubNavbarLinks'
import Link from 'next/link'
import { FaBars } from "react-icons/fa";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const SubNavbar = () => {
    
  return (
    
      <div className='bg-slate-50'>
      <nav className="container mx-auto">
        <ul className='hidden sm:flex text-black/60 text-xs font-medium space-x-6 relative'>
            <div className="flex items-center justify-center">
            <FaBars />
            <li className='border-r pr-6 p-2'>CATEGORIAS</li>

            </div>

            <div className="flex items-center justify-center">
            <MdKeyboardArrowLeft/>
            </div>
        
        
          {links.map((link:any, i:number)=>{
                    return (
                        <div key={i}>
                        
                            <li className={`p-2  `} key={i}>
                            <Link href={link.path}>{link.name}</Link>
                            </li> 

                        
                        </div>
                        
                    )
          })}
            
            <div className="absolute right-0 top-[10px] flex items-center mr-0">
            <MdKeyboardArrowRight/>
            
            </div>
        </ul>
      </nav>
      </div>
    
  )
}

export default SubNavbar