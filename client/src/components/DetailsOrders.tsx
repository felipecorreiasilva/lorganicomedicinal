'use client'

import { OrdersTypes } from '@/Types/OrdersTypes'
import { ProductsTypes } from '@/Types/ProductsTypes'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const DetailsOrders = () => {
    const [detailsData, setDetailsData] = useState<OrdersTypes>()
    const params = useParams()
    const locId = Number(params?.id)

    useEffect(()=>{
        const handleFetchData = async() => {
            const _urlOrdersDB = 'http://localhost:3001/ordersManager/'+locId
            const resultOrdersDB = await axios.get(_urlOrdersDB)
            console.log('resultOrdersDB: ', resultOrdersDB.data[0])
            
            const newObj = {
                ...resultOrdersDB.data[0],
                products: JSON.parse(resultOrdersDB.data[0].products)
            }

            console.log('resultOrdersDBsadasd: ', newObj)

            setDetailsData(newObj)
        }
        handleFetchData()

    },[])
    

  return (
    <>
    {detailsData && (

        <div className='flex text-xs flex-col justify-center items-center w-[45%] h-[96%] mx-auto mt-2 bg-dashboard-800 rounded-md px-8 py-16 shadow-lg'>
        
            <div className="grid grid-cols-2 gap-x-32 gap-y-5">
                    <div className="">
                        <h2>TX ID:</h2>
                        <p className='overflow-auto scrollbar-thin w-28'>{detailsData.txid}</p>
                    </div>

                    <div className="">
                        <h2>Endereço:</h2>
                        <p className=''>{detailsData.adresses}</p>
                    </div>

                    <div className="">
                        <h2>Cep:</h2>
                        <p className=''>{detailsData.cep}</p>
                    </div>

                    <div className="">
                        <h2>Cidade:</h2>
                        <p className=''>{detailsData.city}</p>
                    </div>

                    <div className="">
                        <h2>Complemento:</h2>
                        <p className=''>{detailsData.cityComplement}</p>
                    </div>

                    <div className="">
                        <h2>País:</h2>
                        <p className=''>{detailsData.country}</p>
                    </div>

                    <div className="">
                        <h2>Método de Entrega:</h2>
                        <p className=''>{detailsData.deliveryMethod}</p>
                    </div>

                    <div className="">
                        <h2>Email:</h2>
                        <p className=''>{detailsData.emailContact}</p>
                    </div>

                    <div className="">
                        <h2>Nome:</h2>
                        <p className=''>{detailsData.firstname}</p>
                    </div>

                    <div className="">
                        <h2>Sobrenome:</h2>
                        <p className=''>{detailsData.lastname}</p>
                    </div>

                    <div className="">
                        <h2>N° Casa:</h2>
                        <p className=''>{detailsData.houseNumber}</p>
                    </div>

                    <div className="">
                        <h2>Cpf:</h2>
                        <p className=''>{detailsData.cpf}</p>
                    </div>

                    <div className="">
                        <h2>Telefone:</h2>
                        <p className=''>{detailsData.phone}</p>
                    </div>

                    <div className="">
                        <h2>Bairro:</h2>
                        <p className=''>{detailsData.neighborhood}</p>
                    </div>

                    <div className="">
                        <h2>Método de Pagamento:</h2>
                        <p className=''>{detailsData.paymentMethod}</p>
                    </div>

                    <div className="">
                        <h2>Estado:</h2>
                        <p className=''>{detailsData.uf}</p>
                    </div>

                    <div className="">
                        <h2>Produtos:</h2>
                        {detailsData.products.map((product:ProductsTypes,key:number)=>{
                            return <p key={key} className=''>{product.name}</p>
                        })}
                        
                    </div>

            </div>
        
            
        


        </div>

    )}
    </>
    
  )
}

export default DetailsOrders