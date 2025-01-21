'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { useContactContext } from '@/context/MyContactContext'
import Link from 'next/link'
import { MdVerified } from 'react-icons/md'

const MyContactRequest = () => {


    const { emailContact, setEmailContact, verifiedEmailContact, setVerifiedEmailContact } = useContactContext();

    const handleChangeEmail = () => {
        setVerifiedEmailContact(false)
    }

    const handleOnSubmit = (e:any) => {
        setEmailContact(emailContact)
        setVerifiedEmailContact(true)
    }

  return (
        <>
        
            
                
            {!verifiedEmailContact ? (
                <>
                    <CardContent>
                    <form onSubmit={handleOnSubmit}>
                        <div className="flex flex-col justify-center items-center">
                        <h1 className='my-[64px] uppercase text-sm opacity-60'>Dados de contato</h1>
                        <label className="relative">
                    
                            <input 
                            required
                            name='email'
                            placeholder='Digite seu email completo' 
                            className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                            focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                            value={emailContact}
                            onChange={e => setEmailContact(e.target.value)}
                            type="text" />
                            <p className='text-black absolute
                            peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                            Email
                            <span 
                            className='text-red-500 ml-1'>
                            *</span>
                            </p>
                        
                        
                        </label>

                        </div>
                        
                        <button type="submit" className='p-4 rounded mb-4 mt-16 w-full bg-slate-800 hover:bg-slate-800/95 text-white'>Próximo</button>
                    
                    </form>
                </CardContent>
                <CardFooter className='flex justify-center'>
                <p>Já possui uma conta ? <Link className='text-cyan-500' href={'/signin'}>Entrar.</Link></p>
                </CardFooter>
                </>

            ):(
                <>
                    <CardContent className='mt-4'>
                    <div className='flex justify-between overflow-auto p-5 py-8 text-xs border-gray-300 bg-white rounded shadow'>
                
                <h2 className='font-bold text-[#424242] text-xs mb-2 flex'>
                <MdVerified />
                &nbsp;MEU CONTATO
                </h2>

                

                <div className='flex flex-col text-start'>
                <p className='font-bold text-black'>{emailContact}</p>
                    <p>Sua conta será criada com as<br/>informações fornecidas.</p>
                    <p></p>
                </div>
                    
                    

                    <button onClick={handleChangeEmail} className='font-bold underline'>
                    Alterar
                    </button>       
                
                
            </div>
                        
                    </CardContent>
                </>
                
            )}
            
        
        
        </>
  )
}

export default MyContactRequest