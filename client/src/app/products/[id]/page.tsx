'use client'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { useProductsContext } from '@/context/CartContext'
import { useCartModalContext } from '@/context/CartModalContext'
import { ProductsTypes } from '@/Types/ProductsTypes'
import { InputMask } from '@/utils/InputMask'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaTruckFast } from 'react-icons/fa6'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const page = () => {
    const [isClient, setIsClient] = useState(false)
    const params = useParams()
    const locId = Number(params?.id)-1
    const {addToCart} = useProductsContext();
    const {cartModal,setCartModal}=useCartModalContext();
    const [products, setProducts] = useState<ProductsTypes|any>()
    const [fretes, setFretes] = useState<any|null>([null])
    const [cep, setCep] = useState<string|undefined>('')

    const handleDecreasesAmountProduct = () => {
      console.log(products)
      if (products != null) {
        if (products.amountProduct < 2) return
        const newObj = {...products, amountProduct: (products.amountProduct-1)}
        setProducts(newObj)
      }
      
    }

    const handleIncreaseAmountProduct = () => {
      
      if (products != null) {
        const newObj = {...products, amountProduct: (products.amountProduct+1)}
        setProducts(newObj)
      }

    }

    const handleOnChange = (e:any)=> {

      e.preventDefault()
      switch(e.target.name){

          case 'cep':
              const maskCep = InputMask('cep',e.target.value)
              setCep(maskCep)
              break;

          case 'amountProduct':
            if (products != null){
              if (e.target.value == '' || parseInt(e.target.value) < 1) {
                const newObj = {...products,[e.target.name]:1}
                setProducts(newObj)
              }else {
                const newObj = {...products,[e.target.name]:parseInt(e.target.value)}
                setProducts(newObj)

              }
              
            }
            
            break
         
      }
   
    }

    const handleFrete = async(e:any)=> {

      e.preventDefault()
      
      const unmaskCep = cep?.replace(/[^0-9]/g, '');
      const args = {

          ...products,
          cep: unmaskCep,

      }

      const _url = 'http://localhost:3001/frete'
      const result = (await axios.post(_url,args)).data
      console.log(result)
      setFretes(result)
        
    }

    const handleOnSubmit = () => {
      console.log(products)
      products != null && addToCart(products)
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const _url = 'http://localhost:3001/products'
            const result = await axios.get(_url)
            // console.log(result.data[(parseInt(String(locId))-1)])
            console.log(result.data[locId])
            setProducts(result.data[locId])
        }
        fetchData();
        console.log('data', products)
      }, [])

  return (
    <div className='bg-white h-full pt-[150px] pb-[50px] flex flex-col shadow-2xl justify-center items-center text-black/70'>
      <Card className='w-[1024px]'>
        <CardContent className='py-8'>
          <div className="flex gap-x-4">

            <div className="flex flex-col">
            <img className='w-12 h-12 border p-[2px] mb-2' src={products?.image} alt="" />
            <img className='w-12 h-12 border p-[2px] mb-2' src={products?.image} alt="" />
            <img className='w-12 h-12 border p-[2px] mb-2' src={products?.image} alt="" />
            </div>

            <img className='w-[600px] h-[512px]' src={products?.image} alt="" />

            <Card className="rounded-none">
              <CardContent>
                <h2 className='font-bold text-[18px] py-8'>{products?.name}</h2>
                <CardDescription className='text-[20px] font-bold text-black'>R${products?.price} <span className='ml-1 font-normal opacity-40 line-through'>R${products?.oldPrice}</span></CardDescription>
                <CardDescription className='text-cyan-600 mt-2'>6x de R${(products?.price/6).toFixed(2).replace('.',',')} sem juros</CardDescription>
                <div className="flex mt-2">
                  <CardDescription className='text-cyan-600'>5% de desconto&nbsp;</CardDescription>
                  <CardDescription className='text-black opacity-50'> pagando com pix</CardDescription>
                </div> 
                
                <CardDescription className='text-cyan-600 pt-16 pb-8'>{products?.discount}% {products?.discountDesc}</CardDescription>
                
                <div className='flex space-x-2'>
                  <div className="flex items-center border">
                  <button onClick={handleDecreasesAmountProduct} className="pr-2">
                    <MdKeyboardArrowLeft className='' />
                  </button>
                  {(products?.amountProduct != undefined) && (
                    <input
                    id='amountProduct' 
                    name='amountProduct'
                    value={products?.amountProduct}
                    type="text"
                    onChange={handleOnChange}
                    className='w-12 text-center'
                    />

                  )}
                  
                  
                  {/* <span>{product?.amountProduct}</span> */}
                  <button onClick={handleIncreaseAmountProduct} className="pl-2">
                    <MdKeyboardArrowRight />
                  </button>
                  
                  </div>
                  <button onClick={handleOnSubmit} className='p-2 uppercase text-[12px] bg-black text-white w-full'>Comprar</button>
                  
                </div>

                <div className="flex mt-8">
                  <FaTruckFast className='opacity-50 mr-2' />
                  <p className='opacity-70 uppercase text-[10px]'>Meios de envio</p>
                </div>

                <div className="flex mt-2 mb-4">
                  <input
                  name="cep"
                  id="cep"
                  value={cep}
                  onChange={handleOnChange}
                  placeholder='Seu CEP'
                  className='w-full border p-1'
                  type="text" />
                  <button onClick={(e)=>handleFrete(e)} className='bg-primary-700 p-1 uppercase text-white text-[10px]'>CALCULAR</button>
                </div>
                
                {fretes[0]?.name != null && (
                  <div className='space-y-2'>
                    <div className='text-[10px] border p-4'>
                      
                        <div className="">
                          <h5>{`Correios - ${fretes[0]?.name} (via Melhor Envio)`}</h5>
                          <p className='text-black/40'>{`Chega entre ${fretes[0]?.custom_delivery_range.min} a ${fretes[0]?.custom_delivery_range.max} dias`}</p>
                        </div>
                      
                    </div>

                    <div className='text-[10px] border p-4'>
                      
                        <div className="">
                          <h5>{`Correios - ${fretes[1]?.name} (via Melhor Envio)`}</h5>
                          <p className='text-black/40'>{`Chega entre ${fretes[1]?.custom_delivery_range.min} a ${fretes[1]?.custom_delivery_range.max} dias`}</p>
                        </div>
                      
                    </div>
                  
                  </div>
                  

                )}
                
                

              </CardContent>
              
            </Card>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default page