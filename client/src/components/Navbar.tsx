'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import { FaSearch } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlinePerson } from 'react-icons/md'
import { useProductsContext } from '@/context/CartContext';
import { useCartModalContext } from '@/context/CartModalContext';
import CartModal from './CartModal';

const Navbar = () => {
    
    const {cartModal,setCartModal}=useCartModalContext();
    const [isClient, setIsClient] = useState(false)
    const { products } = useProductsContext();
    let totalProductCount = products?.reduce((totalCount:any, product:any) => totalCount + product?.amountProduct, 0)
    
    useEffect(() => {
      setIsClient(true)
    }, [])

    const handleCartModal = () => {
        setCartModal(!cartModal)
    }

  return (
    
            <div>
    <div className='relative z-20'>
      <CartModal />
    </div>
    {isClient &&
    <nav className='container mx-auto'>

        <ul className='items-center hidden sm:flex justify-between p-8 text-white'>
            
            <div className="w-[90px]">
            <Link
                    className='text-blue-900 font-extrabold'
                    href={'/'}

                    ><img className='' src='/lorganicotrans.png'></img></Link>
                    
                    
                    
            </div>

            <div className="flex w-[840px] rounded-sm bg-white">
                <input 
                type="search"
                name="search"
                id="search"
                placeholder='O que você está buscando?'
                className='w-full border-none bg-transparent px-4 py-1 text-gray-900 outline-none'

                />
                <button
                className='m-2 rounded px-4 text-black/50 py-1'
                ><FaSearch /></button>
            </div>

            <div className="sm:flex space-x-8">
                
                <div className="flex space-x-2">
                <MdOutlinePerson className='w-10 h-10' />
                <div className='text-[12px]'>
                    <p>Olá! <Link href={'/signin'}>Faça Login</Link></p>
                    <p>Ou <Link href={'/signup'}>Cadastre-se</Link></p>
                </div>

                </div>
                
                

                <button onClick={handleCartModal} className="relative">
                    <AiOutlineShoppingCart className='w-10 h-10' />
                    <span className='absolute left-8 bottom-[28px] bg-primary-800 rounded-full px-2 h-[15px] w-[15px] flex items-center justify-center text-center text-[8px] m-auto '>{totalProductCount}</span>
                </button>
            </div>
            
        </ul>
        
        {/* mobile */}
        <ul className='sm:hidden w-full flex justify-between p-8'>
            
                <li>
                    <Link
                    className='text-blue-900 font-extrabold'
                    href={'/'}

                    >Rapé</Link>
                </li>
            
                <li className=''>
                    <button className='h-4 w-4 m-auto text-white'>
                        <IoMenu />
                    </button>
                    
                </li>
        </ul>
        
    </nav>
    }
    </div>
        
    

  )
}

export default Navbar