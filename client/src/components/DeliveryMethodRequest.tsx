import React, { useEffect, useState } from 'react'
import { CardContent } from './ui/card'
import { useSendingToContext } from '@/context/SendingToContext';
import { useDeliveryMethodContext } from '@/context/DeliveryMethodContext';
import { useProductsContext } from '@/context/CartContext';
import axios from 'axios';
import { MdVerified } from 'react-icons/md';
import { ProductsTypes } from '@/Types/ProductsTypes';

const DeliveryMethodRequest = () => {
    const { products } = useProductsContext();
    const { deliveryMethod, setDeliveryMethod, verifiedDeliveryMethod, setVerifiedDeliveryMethod } = useDeliveryMethodContext();
    const { sendingToData, setSendingToData } = useSendingToContext();

    const handleChangeDeliveryMethod = () => {
        setVerifiedDeliveryMethod(false)
    }

    const handleOnChange = (e:any) => {
        // e.preventDefault()

        switch(e.target.name){
          
            default:
              
              setDeliveryMethod(e.target.value)
              break;
           
        }
    }

    const handleOnSubmit = (e:any) => {
        e.preventDefault()
        console.log('deliveryMethod', deliveryMethod)
        setDeliveryMethod(deliveryMethod)
        setVerifiedDeliveryMethod(true)
    }

    const [fretes, setFretes] = useState<any|null>([null])
    
    useEffect(() => {

            const calcFrete = async()=>{

                const unmaskCep = sendingToData.cep?.replace(/[^0-9]/g, '');

                const freteListProducts = products.map((product:ProductsTypes, i:number)=>{

                    const newObj = {

                        id: product.name,
                        width: product.width,
                        height: product.height,
                        length: product._length,
                        weight: product.weight,
                        insurance_value: product.price,
                        quantity: product.amountProduct

                    }
                    
                    return newObj

                })
                
                const args = {
            
                    ...sendingToData,
                    products: freteListProducts,
                    cep: unmaskCep,
                }

                const _url = 'http://localhost:3001/frete/calcFrete'
                const result = await (await axios.post(_url,args)).data
                
                setFretes(result)
                
            }
            calcFrete()
    }, [products])
  return (
    <>
        
            
                
            {!verifiedDeliveryMethod ? (
                <>
                    <CardContent>
                    {fretes[0] && (
                    <form onSubmit={handleOnSubmit}>
                    
                        <div className='space-y-8' >
                        <h1 className='my-[64px] uppercase text-sm opacity-60 flex justify-center items-center'>MÉTODO DE FRETE</h1>

                                
                            <div className='relative'>
                            
                            <input
                            type="radio"
                            name="deliveryMethod"
                            id="deliveryMethodA"
                            className='hidden peer'
                            required
                            onChange={handleOnChange}
                            value='deliveryMethodPac'
                            />
                            
                            <label
                            htmlFor='deliveryMethodA'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">  
                                <img 
                                    className='h-8 m-auto lg:m-0'
                                    src={`${fretes[0]?.company.picture}`} alt="" />
                                
                                    <div className='ml-8'>
                                    
                                    <h6 className=''>{`${fretes[0]?.name}`}</h6>
                                    <p className='text-xs opacity-60'>Entrega em até {`${fretes[0]?.delivery_time}`} dias</p>
                                    <p className='text-xs opacity-60'>Por apenas {`${fretes[0]?.price}`} R$</p>

                                </div>
                            </label>

                            <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-green-950 scale-0 peer-checked:scale-100 transition delay-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                            </div>

                            </div>

                            
                            <div className='relative'>

                            <input
                            type="radio"
                            name="deliveryMethod"
                            id="deliveryMethodB"
                            className='hidden peer'
                            required
                            onChange={handleOnChange}
                            value='deliveryMethodSedex'
                            />

                            <label
                            htmlFor='deliveryMethodB'
                            className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl hover:bg-opacity-75 peer-checked:bg-green-400 peer-checked:text-white cursor-pointer transition">
                                <img 
                                className='h-8 m-auto lg:m-0'
                                src={`${fretes[1]?.company.picture}`} alt="" />
                                <div className='ml-8'>
                                    <h6 className=''>{`${fretes[1]?.name}`}</h6>
                                    <p className='text-xs opacity-60'>Entrega em até {`${fretes[1]?.delivery_time}`} dias</p>
                                    <p className='text-xs opacity-60'>Por apenas {`${fretes[1]?.price}`} R$</p>
                                </div>
                                
                            </label>

                            <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-green-950 scale-0 peer-checked:scale-100 transition delay-100 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                            </svg>
                            </div>

                            </div>

                        </div>
                           
                    <button type="submit" className='p-4 rounded mb-4 mt-16 w-full bg-slate-800 hover:bg-slate-800/95 text-white'>Próximo</button>
                
                </form>
                )}
                </CardContent>
                
                </>

            ):(
                <>
                    <CardContent className='mt-4'>
                        <div className='flex justify-between overflow-auto p-5 text-xs border-gray-300 bg-white rounded shadow'>
                        <h2 className='font-bold flex text-[#424242] mb-2 pb-[24px]'>
                        <MdVerified />
                        &nbsp;SEU FRETE
                        </h2>
                        
                        <div className='flex flex-col text-start justify-center mr-8 pb-[32px]'>
                        <p>Você escolheu <br></br> o método de entrega {deliveryMethod === 'deliveryMethodPac'? 'PAC':'SEDEX'}</p>
                        </div>

                        <button onClick={handleChangeDeliveryMethod} className='font-bold underline'>
                        Alterar
                        </button>       
                
                
            </div>
                        
                    </CardContent>
                </>
                
            )}
            
        
        
        </>
  )
}

export default DeliveryMethodRequest