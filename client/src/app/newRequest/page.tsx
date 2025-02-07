'use client'

import DeliveryMethodRequest from '@/components/DeliveryMethodRequest'
import IdentificationRequest from '@/components/IdentificationRequest'
import MyContactRequest from '@/components/MyContactRequest'
import PaymentMethodRequest from '@/components/PaymentMethodRequest'
import SendingToRequest from '@/components/SendingToRequest'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useProductsContext } from '@/context/CartContext'
import { useDeliveryMethodContext } from '@/context/DeliveryMethodContext'
import { useIdentificationContext } from '@/context/IdentificationContext'
import { useContactContext } from '@/context/MyContactContext'
import { useSendingToContext } from '@/context/SendingToContext'
import { ProductsTypes } from '@/Types/ProductsTypes'
import Image from 'next/image'
import React from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'

const page = () => {
    
    const { products,setProducts,decrementAmount, removeFromCart,incrementAmount } = useProductsContext();
    const { verifiedEmailContact } = useContactContext();
    const { verifiedSendingTo } = useSendingToContext()
    const { verifiedDeliveryMethod } = useDeliveryMethodContext();
    const { verifiedIdentification } = useIdentificationContext();
    
    const totalPrice = products.reduce((total, product) => total + (product.price * product.amountProduct), 0);

    const handleOnChange = (e:any,product:ProductsTypes)=> {
        
        e.preventDefault()
        switch(e.target.name){
  

  
            case 'amountProduct':
              if (products != null){
                if (e.target.value == '' || parseInt(e.target.value) < 1) {
                  const newObj = [...products]
                  newObj.forEach(p => 
                    {if (p.id == product.id) p.amountProduct = 1}
                    );
                  setProducts(newObj)
                }else {
                //   const newObj = {...products,[e.target.name]:parseInt(e.target.value)}
                  const newObj = [...products]
                  newObj.forEach(p => 
                    {if (p.id == product.id) p.amountProduct = parseInt(e.target.value)}
                    );
                  setProducts(newObj)
  
                }
                
              }
              
              break
           
        }
     
    }

  return (
    
        <div className='bg-white h-full pt-[200px] flex justify-center items-center py-16 text-black/70'>
                
                <Card className='mb-auto w-[600px]'>
                    
                    {<MyContactRequest /> }
                    {verifiedEmailContact && <SendingToRequest/>}
                    {verifiedEmailContact && verifiedSendingTo && <DeliveryMethodRequest/>}
                    {verifiedEmailContact && verifiedSendingTo && verifiedDeliveryMethod && <IdentificationRequest/>}  
                    {verifiedEmailContact && verifiedSendingTo && verifiedDeliveryMethod && verifiedIdentification && <PaymentMethodRequest/>}

                </Card>
                
                <Card className='mb-auto ml-8 w-[400px]'>
                    <CardHeader className='border-b-[1px]'>
                        <div className="flex justify-between ">
                        <h2 className='font-semibold uppercase text-xs'>Resumo do pedido</h2>
                        {/* <p className='text-xs underline'>Editar Carrinho</p> */}

                        </div>
                        
                    </CardHeader>
                    <CardContent>
                        
                        {products.map((product:ProductsTypes,i:number)=>{
                            return (

                                <Card key={i} className='my-[16px] rounded-none'>
                                    <CardContent>
                                    

                                    <div className="mt-[24px] text-xs justify-between">
                                        
                                        <div className="flex relative">
                                        <img className="w-12 h-16 border-[1px] p-0.5" src={product.image} alt={product.name}/>
                                        <p className='mt-2 ml-4'>{product.name}</p>
                                        <button className="absolute w-8 h-[40px] cursor-pointer -right-[12px] -top-[4px]" onClick={() => removeFromCart(i)}>
                                            <RiDeleteBin6Line />
                                        </button>

                                        </div>

                                            <div className="flex justify-between font-bold text-xs mt-4 ml-16 text-black">
                                            <div className="flex items-center border py-[2px]">
                                                <button onClick={()=>decrementAmount(product.id)} className="pr-2">
                                                <MdKeyboardArrowLeft className='' />
                                                </button>
                                                {(product?.amountProduct != undefined) && (
                                                <input
                                                id='amountProduct' 
                                                name='amountProduct'
                                                value={product?.amountProduct}
                                                type="text"
                                                onChange={e=>handleOnChange(e,product)}
                                                className='w-8 text-center outline-none'
                                                autoComplete="off"
                                                />
                            
                                                )}
                                                
                                                
                                                {/* <span>{product?.amountProduct}</span> */}
                                                <button onClick={()=>incrementAmount(product?.id)} className="pl-2">
                                                <MdKeyboardArrowRight />
                                                </button>
                                                
                                            </div>
                                            <p className="font-bold">R${((product?.price)*product?.amountProduct).toFixed(2).replace('.',',')}</p>
                                            
                                        
                                        </div>

                                    </div>


                                    </CardContent>
                                
                                </Card>

                            )
                        })}

                        
                        
                    </CardContent>
                    
                        <div className="border-t-[1px] flex justify-between text-black font-semibold py-4 px-8">
                            <p className='uppercase'>Total</p>
                            <p className='uppercase'>R${totalPrice.toFixed(2).replace('.',',')}</p>
                        </div>

                    
                </Card>

                
                
        

        
        </div>
        
        

    
    
  )
}

export default page