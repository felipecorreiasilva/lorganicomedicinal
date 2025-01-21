'use client'

import React from 'react'
import Navbar from './Navbar'
import SubNavbar from './SubNavbar'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  console.log('pathname.substring(0,9): ', pathname.substring(0,10))
  return (
    <>
    {pathname.substring(0,10) != '/dashboard' && (
      
      <header className='fixed z-50 w-full bg-primary-950'>
      <p className="bg-[#d9a53f] text-center">Promoções de medicinas orgânicas e frete gratis para seu final de ano!</p>
        <Navbar />
        <SubNavbar />
      </header>

    )}
    </>
    
  )
}

export default Header