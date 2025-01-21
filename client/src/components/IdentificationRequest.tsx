import React, { useState } from 'react'
import { MdVerified } from 'react-icons/md'
import { CardContent, CardFooter } from './ui/card'
import Link from 'next/link'
import { useIdentificationContext } from '@/context/IdentificationContext'
import { InputMask } from '@/utils/InputMask'
import { HiMiniIdentification } from 'react-icons/hi2'
import { FaStoreAlt } from 'react-icons/fa'
import { IoMdRadioButtonOn } from 'react-icons/io'

const IdentificationRequest = () => {

    const { identificationData, setIdentificationData, verifiedIdentification, setVerifiedIdentification } = useIdentificationContext();
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const handleChangeIdentification = () => {
      setVerifiedIdentification(false)
    }

    const handleOnChange = (e:any)=> {
    //   e.preventDefault()
      switch(e.target.name){

          case 'cpf':

                const cpfObj = {...identificationData,[e.target.name]:InputMask('cpf',e.target.value)}
                setIdentificationData(cpfObj)

                break;

          case 'cnpj':

                const cnpjObj = {...identificationData,[e.target.name]:InputMask('cnpj',e.target.value)}
                setIdentificationData(cnpjObj)

                break;

          case 'phone':
              const phoneObj = {...identificationData,[e.target.name]:InputMask('phone',e.target.value)}
              setIdentificationData(phoneObj)
              break;

          case 'identificationType':
              const identificationTypeObj = {...identificationData,[e.target.name]:e.target.value}
              setIdentificationData(identificationTypeObj)
              break;
        
        
         
        }
   
    }

    const handleOnSubmit = (e:any) => {   
        e.preventDefault()
        const unmaskCpf = identificationData?.cpf?.replace('.', '').replace('.', '').replace('-', '')
        const unmaskPhone = identificationData?.phone?.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
        
        setIdentificationData(identificationData)
    
        setVerifiedIdentification(true)
        
    }

  return (
    <>
    {identificationData && (
    <>
        
            
                
            {!verifiedIdentification ? (
                <>
                    <CardContent>
                    <form onSubmit={handleOnSubmit}>
                        <div className="flex flex-col justify-center items-center space-y-4">
                        <h1 className='my-[64px] uppercase text-sm opacity-60'>Identificação</h1>
                        
                        {isSelected === false ? (
                            <>
                            <p className='text-xs opacity-55'>Aperte duas vezes em uma opção para checar</p>
                        <label 
                        className="cursor-pointer border relative"
                        >
                            <input 
                            value='CPF'
                            onChange={handleOnChange}
                            type="radio" 
                            className="peer sr-only" 
                            name="identificationType" />
                            <div className="w-72 max-w-xl p-5 bg-white text-gray-600 hover:shadow ring-2 
                            ring-transparent peer-checked:text-sky-600 peer-checked:ring-sky-500 peer-checked:ring-offset-2">
                            
                            <HiMiniIdentification className='w-8 h-8 text-blue-600' />
                            
                            <div className="flex flex-col gap-1">
                            
                                <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold uppercase text-gray-500 ml-[2px]">CPF</p>
                                
                                </div>

                            </div>

                            </div>

                            <div className="flex absolute top-0 right-[40px] bottom-0 w-4 h-4 my-auto text-sky-600 scale-0 peer-checked:scale-100 transition delay-100 ">
                                
                                <IoMdRadioButtonOn />
                            </div>

                        </label>

                        <label 
                        className="cursor-pointer border relative"
                        >
                            <input 
                            value='CNPJ'
                            onChange={handleOnChange}
                            type="radio" 
                            className="peer sr-only" 
                            name="identificationType" />

                            <div className="w-72 max-w-xl p-5 bg-white text-gray-600 hover:shadow ring-2 
                            ring-transparent peer-checked:text-sky-600 peer-checked:ring-sky-500 peer-checked:ring-offset-2">
                            
                            
                            <FaStoreAlt className='w-8 h-8 text-blue-600' />
                            <div className="flex flex-col gap-1">

                                <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold uppercase text-gray-500">CNPJ</p>

                                </div>


                            </div>

                            </div>
                            
                            
                            <div className="flex absolute top-0 right-[40px] bottom-0 w-4 h-4 my-auto text-sky-600 scale-0 peer-checked:scale-100 transition delay-100 ">
                                
                                <IoMdRadioButtonOn />
                            </div>
                            

                        </label>
                        <div className="w-full">
                        <button onClick={()=>setIsSelected(true)} className='p-4 rounded mb-4 mt-16 w-full bg-slate-800 hover:bg-slate-800/95 text-white'>Próximo</button>

                        </div>
                       

                        
                        
                            </>
                        ):(<>

                            

                            <>
                                {identificationData.identificationType == 'CPF' ? (

                                    <label className="relative">
                                                                    
                                    <input 
                                    required
                                    name="cpf"
                                    id="cpf"
                                    placeholder='Digite seu endereço de CPF' 
                                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                    focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                                    value={identificationData?.cpf}
                                    onChange={handleOnChange}
                                    type="text" />
                                    <p className='text-black absolute
                                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                    CPF
                                    <span 
                                    className='text-red-500 ml-1'>
                                    *</span>
                                    </p>

                                    </label>

                                ):(
                            <label className="relative">

                            <input 
                            required
                            name="cnpj"
                            id="cnpj"
                            placeholder='Digite seu endereço de CNPJ' 
                            className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                            focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                            value={identificationData?.cnpj}
                            onChange={handleOnChange}
                            type="text" />
                            <p className='text-black absolute
                            peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                            CNPJ
                            <span 
                            className='text-red-500 ml-1'>
                            *</span>
                            </p>

                            </label>
                            )}

                                    <label className="relative">

                                    <input 
                                    required
                                    name="phone"
                                    id="phone"
                                    placeholder='(99) 9 9999 9999' 
                                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                    focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                                    value={identificationData?.phone}
                                    onChange={handleOnChange}
                                    type="text" />
                                    <p className='text-black absolute
                                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                    Telefone
                                    <span 
                                    className='text-red-500 ml-1'>
                                    *</span>
                                    </p>

                                    </label>

                                    </>
                                

                            <div className="flex justify-between items-center space-x-32">

                            <button onClick={()=>setIsSelected(false)} className='p-[10px] rounded mb-4 mt-16 bg-slate-800 hover:bg-slate-800/95 text-white uppercase'>Voltar</button>
                            <button type="submit" className='p-[10px] rounded mb-4 mt-16 bg-slate-800 hover:bg-slate-800/95 text-white uppercase'>Próximo</button>

                            </div>

                            
                        </>)}
                        

                        
                        
                        

                        </div>
                        
                        
                    
                    </form>
                </CardContent>
                
                </>

            ):(
                <>
                    <CardContent className='mt-4'>
                    <div className='flex justify-between overflow-auto p-5 py-8 text-xs border-gray-300 bg-white rounded shadow'>
                
                <h2 className='font-bold text-[#424242] text-xs mb-2 flex'>
                <MdVerified />
                &nbsp;IDENTIFICAÇÃO
                </h2>

                

                <div className='flex mr-[40px] flex-col text-start'>
                <p>Sua Identificação foi confirmada</p>
                <p className=''>{identificationData.cpf}</p>
                <p className=''>{identificationData.phone}</p>
                </div>
                    
                    

                    <button onClick={handleChangeIdentification} className='font-bold underline'>
                    Alterar
                    </button>       
                
                
            </div>
                        
                    </CardContent>
                </>
                
            )}
            
        
        
        </>
    )}
    </>
  )
}

export default IdentificationRequest