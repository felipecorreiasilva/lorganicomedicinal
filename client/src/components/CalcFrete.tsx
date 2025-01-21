'use client'
import { ProductsTypes } from '@/Types/ProductsTypes'
import { InputMask } from '@/utils/InputMask'
import axios from 'axios'
import React, { useState } from 'react'
import { FaTruckFast } from 'react-icons/fa6'

interface CalcFreteProps {
    products: ProductsTypes[]
}

const CalcFrete = ({products}:CalcFreteProps) => {
    
    const [cep, setCep] = useState<string|undefined>('')
    const [fretes, setFretes] = useState<any|null>([null])
    
    const handleOnChange = (e:any)=> {

        e.preventDefault()

        switch(e.target.name){
  
            case 'cep':
                const maskCep = InputMask('cep',e.target.value)
                setCep(maskCep)
                break;
           
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

  return (
    <div>
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
    </div>
  )
}

export default CalcFrete