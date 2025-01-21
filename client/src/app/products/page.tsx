'use client'

import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { ProductsTypes } from "@/Types/ProductsTypes";
import { useRouter } from 'next/navigation'

const page = () => {
    const [dataProducts, setDataProducts] = useState<ProductsTypes[]>([])   
    const router = useRouter();

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
    <div className='bg-white h-full pt-[150px] flex flex-col shadow-2xl justify-center items-center text-black/70'>
        <div className="grid grid-cols-5 gap-4">
        {dataProducts.map((product:any, i:number)=>{
            return (
                <Card key={i} onClick={()=>router.push(`/products/${product.id}`)} className='cursor-pointer pb-[80px]'>
            
                    <img className='w-[160px] h-[160px]' src={product.image} alt="" />
                    
                    <CardContent className='relative'>
                        <CardDescription className='text-[10px] absolute left-2 py-2 opacity-80'>{product.name}</CardDescription>
                        <CardDescription className='text-[10px] text-cyan-600 absolute left-2 top-8 opacity-80'>{product.discount}%<br/>{product.discountDesc}</CardDescription>
                        <CardDescription className='text-black font-bold absolute left-2 top-[80px] opacity-80'>R$ {product.price} <span className='ml-1 font-medium opacity-40 line-through'>R$ {product.oldPrice}</span></CardDescription>
                    </CardContent>
                    <CardFooter>

                    </CardFooter>
                </Card>

            )
        })}

        </div>
        
        <div className='font-bold flex justify-center items-center'>
            <button><MdKeyboardArrowLeft/></button>
            1/5
            <button><MdKeyboardArrowRight/></button>
        </div>
        
    </div>
  )
}

export default page