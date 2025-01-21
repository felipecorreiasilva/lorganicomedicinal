'use client'
import React, { useEffect, useState } from 'react'
import './TableComponents.css'
import { ProductsTypes } from '@/Types/ProductsTypes'
import axios from 'axios'
import { LuPackage, LuPackageX } from 'react-icons/lu'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import Modal from './ModalDashboard'
import { BiTrash } from 'react-icons/bi'
import EditProductForm from './EditProductForm'
import { BsSearch } from 'react-icons/bs'
import { HiOutlineSearchCircle } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

const TableProducts = () => {
    
    const [dataProducts, setDataProducts] = useState<ProductsTypes[]>([])  
    const [currentPage, setCurrentPage] = useState(1)

    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
    const [selectedModalDelete, setSelectedModalDelete] = useState<any>(null);

    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [selectedModalEdit, setSelectedModalEdit] = useState<any>(null);

    const recordsPerPage = 3;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = dataProducts?.slice(firstIndex,lastIndex)
    const npage = Math.ceil(dataProducts.length / recordsPerPage)
    const numbers =  [...Array(npage+1).keys()].slice(1)
    const router = useRouter();
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

    const handleDeleteProduct = async(id:number) => {
        const url = "http://localhost:3001/deleteProduct/"+id
        const result = await axios.delete(url)
        const _urlGet = 'http://localhost:3001/products'
            const _resultGet = await axios.get(_urlGet)
            console.log(result)
            setDataProducts(_resultGet.data)
        
    }

    const expandModalDelete = (product:any) => {
        
        setSelectedModalDelete(product);
        setOpenModalDelete(true);

    }

    const handleEditProduct = async(id:number) => {
        
        
    }

    const expandModalEdit = (product:any) => {
        
        setSelectedModalEdit(product);
        setOpenModalEdit(true);

    }

    useEffect(() => {
        const fetchData = async () => {
            const _url = 'http://localhost:3001/products'
            const result = await axios.get(_url)
            console.log(result)
            setDataProducts(result.data)
        }
        fetchData();
      }, [])

  return (
    <>
    {dataProducts && (
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
                        <th className='px-[15px] py-[12px]'>Produto</th>
                        <th className='px-[15px] py-[12px]'>Nome</th>
                        <th className='px-[15px] py-[12px]'>Altura</th>
                        <th className='px-[15px] py-[12px]'>Largura</th>
                        <th className='px-[15px] py-[12px]'>Comprimento</th>
                        <th className='px-[15px] py-[12px]'>Peso</th>
                        <th className='px-[15px] py-[12px]'>Valor</th>
                        <th className='px-[15px] py-[12px]'>Editar</th>
                        <th className='px-[15px] py-[12px]'>Remover</th>
                    </tr>
                </thead>
                <tbody>
                {records.map((product,index)=>

                    (<tr className='border-b bg-[#1b1919] border-b-gray-500' key={index}>
                                        
                    <td className='px-[15px] py-[12px]'>{product.id}</td>
                    <td className='px-[15px] py-[12px]'>
                        <img className='w-12 h-12 border p-[2px] bg-white' src={product.image} alt="" />
                    </td>
                    <td className='px-[15px] py-[12px]'>{product.name}</td>
                    <td className='px-[15px] py-[12px]'>{product.height}</td>
                    <td className='px-[15px] py-[12px]'>{product.width}</td>
                    <td className='px-[15px] py-[12px]'>{product._length}</td>
                    <td className='px-[15px] py-[12px]'>{product.weight}</td>
                    <td className='px-[15px] py-[12px]'>{product.price}</td>
                    <td className='px-[15px] py-[12px]'>
                        <button>
                            <LuPackage 
                            onClick={()=>router.push(`/dashboard/products/editProduct/${product.id}`)}
                            className='ml-3 text-cyan-600' size={20} /></button>
                            
                    </td>
                    <td className='px-[15px] py-[12px]'>
                        <button>
                            <LuPackageX 
                            onClick={()=>expandModalDelete(product)}
                            className='ml-5 text-red-600' size={20} />
                        </button>

                        <Modal open={openModalDelete} onClose={()=>setOpenModalDelete(false)}>
                            <div className="text-center w-full">
                                <BiTrash size={56} className='mx-auto text-red-600'/>
                                <div className="mx-auto my-4 w-64">
                                    <h3 className='text-base font-black text-gray-800 mb-4'>Confirmar Remoção</h3>
                                    <p className='text-sm text-gray-500'>Tem certeza de que deseja excluir</p>
                                    <p className='text-sm text-gray-500 mb-8'>{selectedModalDelete?.name} ?</p>
                                </div>
                                <div className="flex gap-4">
                                    <button 
                                    onClick={()=> setOpenModalDelete(false)}
                                    className='w-full border border-gray-500 hover:bg-gray-500 hover:text-white text-gray-500 rounded-md p-2 '>Cancelar</button>
                                    <button 
                                    onClick={()=>handleDeleteProduct(product.id)}
                                    className='w-full border border-red-600 hover:bg-red-700 hover:text-white text-red-600 rounded-md p-2'>Delete</button>
                                    
                                </div>
                            </div>
                        </Modal>

                    </td>
                    
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

export default TableProducts