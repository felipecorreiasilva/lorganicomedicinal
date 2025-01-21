'use client'

import { links } from '@/constants/SubNavbarLinks'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaInstagram } from 'react-icons/fa';
import { IoLogoWhatsapp } from "react-icons/io";

function Footer() {
const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {pathname.substring(0,10) != '/dashboard' && (
        <>
        {isClient &&
        <footer className='p-32 container mx-auto'>
            <div className="text-primary-800 text-center text-xs">
              <div className="flex justify-center pb-8">
              <IoLogoWhatsapp className='h-8 w-8'/>
              <FaInstagram className='h-8 w-8'/>
  
              </div>
              
              <div className="grid grid-cols-3 text-start">
                <div className="">
                <h1 className=''>DEPARTAMENTOS</h1>
                <div className='flex flex-col'>
                                
                {links.map((link:any, i:number)=>{
                    return (
                        
                      <Link key={i} className='no-underline ' href={link.path}>{link.name}</Link>
                            
                    )
                })}
                </div>
  
                </div>
                
  
              </div>
              
  
            </div>
        </footer>
        }
        </>

      )}
      

    
    </>
    
  )
}

export default Footer