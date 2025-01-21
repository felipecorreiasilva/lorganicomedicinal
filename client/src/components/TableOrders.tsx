'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { HiOutlineSearchCircle } from 'react-icons/hi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import './TableComponents.css'
import { OrdersTypes } from "@/Types/OrdersTypes";
import { LuPackage } from 'react-icons/lu';
import Link from 'next/link';

const TableOrders = () => {
    const [dataOrders, setDataOrders] = useState<OrdersTypes[]>([])  
    const [currentPage, setCurrentPage] = useState(1)

    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = dataOrders?.slice(firstIndex,lastIndex)
    const npage = Math.ceil(dataOrders?.length / recordsPerPage)
    const numbers =  [...Array(npage+1).keys()].slice(1)
    
    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }

    }

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1)
        }

    }

    const changeCPage = (id:number) => {
        setCurrentPage(id)

    }

    useEffect(() => {
        const fetchData = async () => {
            const _urlCob = 'http://localhost:3001/ordersManager/v2/cob'
            const _urlOrdersDB = 'http://localhost:3001/ordersManager/'
            const resultCob = await axios.get(_urlCob)
            const cobData = resultCob.data.cobs
            const resultOrdersDB = await axios.get(_urlOrdersDB)
            const UpdateOrders:OrdersTypes[] = resultOrdersDB.data.map((order:OrdersTypes,i:number)=>{

                const newObj = {
                    id: order.id,
                    adresses: order.adresses,
                    cep: order.cep,
                    city: order.city,
                    cityComplement: order.cityComplement,
                    country: order.country,
                    deliveryMethod: order.deliveryMethod,
                    emailContact: order.emailContact,
                    firstname: order.firstname,
                    lastname: order.lastname,
                    houseNumber: order.houseNumber,
                    cpf: order.cpf,
                    phone: order.phone,
                    neighborhood: order.neighborhood,
                    paymentMethod: order.paymentMethod,
                    pixCopiaECola: order.pixCopiaECola,
                    txid: order.txid,
                    uf: order.uf,
                    products: order.products,
                    status: cobData[i].status,
                    shipping: order.shipping,
                    price: order.price
                    
                }
                
                return newObj

            })

            UpdateOrders.forEach((order)=>{

                const _urlOrdersUpdate = 'http://localhost:3001/ordersUpdate/'+order.id
                axios.put(_urlOrdersUpdate,order)

            })

            

            console.log('resultCob.data: ', resultCob.data)
            console.log('resultOrdersDB: ', resultOrdersDB.data)
            console.log('UpdateOrders: ', UpdateOrders)
            setDataOrders(UpdateOrders)
        }
        fetchData();
      }, [])

  return (
    <>
    {dataOrders && (
        <div className="flex flex-col w-full overflow-x-auto scrollbar-none px-4">
                
        <div className='p-4 my-16 bg-dashboard-800 border border-dashboard-800 rounded-md'>
                        
            <div className="flex justify-between gap-x-4 w-full">
            
            <div className="flex sm:w-full w-[800px] bg-dashboard-600 p-2.5 items-center rounded-md">
            <BsSearch className={`text-white text-lg block float-left cursor-pointer mr-2 gap-x-8`}/>
            <input 
            className='w-full bg-transparent focus:outline-none'
            type="search" />
            </div>

            <button className='bg-primary-900 px-16 border border-primary-900 rounded-md'>
                <div className="flex gap-x-2 items-center">
                <HiOutlineSearchCircle className=''/>
                <p>Pesquisar</p>
                </div>
                
            </button>

            </div>
                        
                        
        
        </div>
        

        <table className='w-full mb-16 mx-auto content-table text-white'>
        <thead className=''>
            <tr className='bg-primary-900'>
                <th className='px-[15px] py-[12px]'>ID</th>
                <th className='px-[15px] py-[12px]'>Nome</th>
                <th className='px-[15px] py-[12px]'>Cpf</th>
                <th className='px-[15px] py-[12px]'>Telefone</th>
                <th className='px-[15px] py-[12px]'>Status</th>
                <th className='px-[15px] py-[12px]'>Envio</th>
                <th className='px-[15px] py-[12px]'>Valor</th>
                <th className='px-[15px] py-[12px]'>Detalhes</th>
            </tr>
        </thead>
        <tbody>
        {records.map((order,index)=>
            
            (<tr className='border-b bg-[#1b1919] border-b-gray-500' key={index}>
                                
            <td className='px-[15px] py-[12px]'>{order.id}</td>
            <td className='px-[15px] py-[12px]'>{order.firstname} {order.lastname}</td>
            <td className='px-[15px] py-[12px]'>{order.cpf}</td>
            <td className='px-[15px] py-[12px]'>{order.phone}</td>
            <td className='px-[15px] py-[12px]'>{order.status}</td>
            <td className='px-[15px] py-[12px]'>{order.shipping}</td>
            <td className='px-[15px] py-[12px]'>{order.price}</td>
            <td className='px-[15px] py-[12px] cursor-pointer'><Link href={`/dashboard/orders/details/${order.id}`}><LuPackage className='ml-5 text-cyan-600' size={20}/></Link></td>
            
            
            
            </tr>)

        )}
            

            
        </tbody>
        </table>
        <nav className='mx-auto'>
            <ul className='flex'>
                <li
                className='flex items-center px-2'
                >
                    <a 
                    onClick={prePage}
                    href="#">
                        <IoIosArrowBack/> 
                    </a>
                </li>
                
                {numbers.map((n,i)=>(
                <li 
                onClick={()=> changeCPage(n)}
                className={`rounded-sm px-4 mx-[2px] ${currentPage === n ? 'bg-dashboard-800 ':''} border border-dashboard-800`}
                key={i}>
                    <a 
                    
                    href='#'>
                        {n}
                    </a>
                </li>
        
                ))}
                <li className='flex items-center px-2'>
                    <a 
                    onClick={nextPage}
                    href="#"><IoIosArrowForward/></a>
                </li>
            </ul>
        </nav>
        
    </div>
    )}
    </>
  )
}

export default TableOrders