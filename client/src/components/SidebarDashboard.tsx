'use client'

import { MoreVertical, Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BsArrowLeftShort, BsChevronDown, BsSearch } from 'react-icons/bs'
import { FaChartLine, FaMoneyBill, FaUsers } from 'react-icons/fa'
import { GoPackageDependents } from 'react-icons/go'
import { IoIosHelpCircleOutline } from 'react-icons/io'
import { LuPackageOpen, LuPackagePlus, LuPackageSearch } from 'react-icons/lu'
import { RiDashboardFill } from 'react-icons/ri'

const SidebarDashboard = () => {
    const [open, setOpen] = useState<boolean>(true)
    const [submenuOpen, setSubmenuOpen] = useState<boolean>(false)
    const router = useRouter()
    const Menus = [
        { title: 'Painel'},
        { title: 'Estatísticas', icon: <FaChartLine /> },
        { title: 'Usuários', spacing: true, icon: <FaUsers /> },
        { 
            title: 'Produtos',
            submenu: true,
            submenuItems: [
                {
                    title: 'Adicionar Produto',
                    icon: <LuPackagePlus />
                },
                {
                    title: 'Lista de Produtos',
                    icon: <LuPackageSearch />,
                    link: '/dashboard/products'
                },
                
                
            ],
            icon: <LuPackageOpen />

         },
        { title: 'Pedidos', icon: <GoPackageDependents />, link: '/dashboard/orders' },
        { title: 'Faturamentos', spacing: true, icon: <FaMoneyBill /> },
        { title: 'Configurações', icon: <Settings /> },
        { title: 'Ajuda', icon: <IoIosHelpCircleOutline /> },
    ]
  return (
    <div className="relative z-10">
        <BsArrowLeftShort 
        onClick={()=>setOpen(!open)}
        className={`h-8 w-8 bg-[#050505] rounded-full absolute -right-4 top-12 
        border border-[#0d0c0c] cursor-pointer ${!open && "rotate-180"}`}/>

    <div className={`bg-[#0d0c0c] h-full p-5 pt-8 ${open ? 'w-72':'w-24'} overflow-y-scroll scrollbar-none`}>
        
        <div className="flex">

        <Link
            className='text-blue-900 font-extrabold'
            href={'/'}
        ><img 
        className={`h-16 w-16 duration-500
            ${open && "rotate-[360deg]"}`}
        src='/lorganicotrans.png'
        /></Link>

        

        </div>

        <div className={`flex items-center rounded-md bg-slate-600 mt-6 ${!open ? 'px-2.5':'px-4'} py-2`}>

            <BsSearch className={`text-white text-lg block float-left cursor-pointer mx-auto ${open && 'mr-2'}`}/>
            <input 
            placeholder='Search'
            className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && 'hidden'}`}
            type={'search'}/>

        </div>

        <ul className='pt-2'>
            {Menus.map((menu, index)=> (
                
                <div
                key={index}
                className=''
                onClick={()=>{
                    menu.link && router.push(`${menu.link}`)
                }}
                >
                
                    <li
                    onClick={()=>{
                        if (menu.submenu){
                            setSubmenuOpen(!submenuOpen)
                        }
                        
                    }}
                     
                    className={`text-gray-300 text-sm flex items-center gap-x-4 
                    cursor-pointer p-2 hover:bg-slate-600 rounded-md ${menu.spacing ? 'mt-9':'mt-2'}`}>
                        
                        
                            <span className={`${!open && 'mx-auto'} text-2xl block float-left`}>
                                {menu.icon ? menu.icon : <RiDashboardFill className=''/>}
                                
                            </span>
                        
                        
                        <span 
                        className={`text-base font-medium duration-200 ${!open && 'hidden'}`}>{menu.title}</span>
                        
                        {menu.submenu && open && (
                            <BsChevronDown className={`${open && 'ml-auto'} ${submenuOpen && "rotate-180"}`} />
                        )}


                    </li>
                
                    {menu.submenu && submenuOpen && open &&(
                        <ul>
                            {menu.submenuItems.map((submenuItem, index)=>(
                                <Link
                                className='text-blue-900 font-extrabold'
                                href={String(submenuItem.link)}
                                key={index}
                                >
                                    <li 
                                    className={`text-gray-300 text-xs font-medium flex items-center gap-x-4 
                                    cursor-pointer p-2 px-5 hover:bg-slate-600 rounded-md`} 
                                    >
                                        <div className='flex'>
                                            <span className={`${!submenuOpen && 'mx-auto'} text-2xl block float-left`}>
                                            {submenuItem.icon && submenuItem.icon}
                                            </span>
                                        </div>
                                        <p>{submenuItem.title}</p>
                                        

                                    </li>
                                </Link>
                            ))}
                        </ul>
                    )}
                </div>

            ))}
            <div className="border-t border-stone-900 flex p-3 mt-16">
                    <img className='w-8 h-8 rounded-full' src='/profile.jpg'/>
                    
                    <div className={`flex justify-between items-center overflow-hidden transition-all 
                        ${open ? "w-42 ml-3": "w-0"}`}>
                        <div className="leading-4">
                            <h4 className='font-semibold'>Felipe Correia</h4>
                            <span className='text-xs text-gray-600'>felipecorreiasilva@outlook.com</span>
                        </div>
                        <MoreVertical className='text-white text-xl'/>
                    </div>

        </div>
        </ul>

        
        
    </div>

    </div>
    
  )
}

export default SidebarDashboard