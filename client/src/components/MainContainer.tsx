'use client'

import { usePathname } from 'next/navigation'
import React, { ReactNode, useEffect, useState } from 'react'

interface PropsMainContainer {
    children: ReactNode
}

const MainContainer = (props:PropsMainContainer) => {
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
    {pathname.substring(0,10) != '/dashboard' ? (
      <>
      {isClient &&
      
      <div className='flex flex-col'>
        
        <main className="pt-40 sm:pt-[80px]">
          
            {props.children}

        </main>
        
       </div>
    
      
      }
      </>

    ):<>{props.children}</>} 
    </>
    
    
    
    
    
  )
}

export default MainContainer