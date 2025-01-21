'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import './stepper.css';
import { TiTick } from 'react-icons/ti';
import { InputMask } from '@/utils/InputMask';
import { Eye, EyeOff } from 'lucide-react';

type formDataType = {
  username: string,
  password: string,
  confirmPassword: string,
  birth: string,
  email: string,
  phone: string,

}

const page = () => {
  const steps = ['Nome', 'Informações', 'Contato'];
      const [currentStep, setCurrentStep] = useState(1)
      const [complete, setComplete] = useState(false)

      const [formData, setFormData] = useState<formDataType>({
        username: '',    
        password: '',
        confirmPassword: '',
        birth: '',
        email: '',
        phone: '',
        
        
      });
      const [isShow, setIsShow] = useState(false);
      const handlePassword = () => setIsShow(!isShow);

      const handleOnChange = (e:any) => {
        e.preventDefault()
        
        switch(e.target.name){

          case 'phone':
          const phoneObj = {...formData,[e.target.name]:InputMask('phone',e.target.value)}
          setFormData(phoneObj)
          break;

          default:
          const newObj = {...formData,[e.target.name]:e.target.value}
          setFormData(newObj)
          break
        }


      }

      const handleButtonBack = (e:any) => {
        e.preventDefault()
        currentStep > 1 && (
          setComplete(false),
          setCurrentStep((prev) => prev - 1)
        )
      }

      const handleButtonNext = (e:any) => {
        e.preventDefault()
        if (currentStep == 1) {
          if (formData.username.length < 4){
            console.log(currentStep)
            return alert('Nome precisa conter pelo menos 4 caracteres')
          }
        }else if (currentStep == 2) {
          console.log(currentStep)

          if (formData.password.length < 4){
            return alert('Senha precisa conter pelo menos 4 caracteres')
          }

          if (formData.confirmPassword.length < 4){
            return alert('Confirmação de senha precisa conter pelo menos 4 caracteres')
          }else if (formData.password != formData.confirmPassword){
            return alert('A confirmação deve ser semelhante a sua senha')
          }

          if (!formData.birth.trim()){
            return alert('Data de nascimento é um campo obrigatório')
          }

        }
        
    

        currentStep === steps.length
        ? setComplete(true)
        : setCurrentStep((prev) => prev + 1);
      }

      const handleSubmit = (e:any) => {
        e.preventDefault()
        console.log('DATA: ',formData)
      }

  return (
    

        <div className='bg-white h-full pt-[200px] flex flex-col justify-center items-center py-16 text-black/70'>
            <Card className='px-8'>
            <CardHeader>
              <CardTitle><h1 className='text-[20px] font-bold py-8 text-center'>Criar uma conta</h1></CardTitle>
              {/* <Stepper/> */}
              <div className='flex justify-between'>
              
            {
                steps?.map((step, i)=>(
                    <div key={i} className={`step-item ${
                        currentStep === i + 1 && 'active'

                    } ${(i + 1 < currentStep || complete) && 'complete'}`}
                    >
                        <div className='step'>{
                          (i + 1 < currentStep || complete) ? <TiTick size={24} /> : i + 1 
                          }</div>
                        <p className='text-gray-500'>{step}</p>
                    </div>
                ))
            }
        
            </div>
            </CardHeader>
            <CardContent className=''>
            
            <form onSubmit={(e)=>handleSubmit(e)}>

                <div className="flex flex-col">
                  
                  {currentStep === 1 && (
                    <label className="relative">
                  
                    <input 
                    required
                    name='username'
                    placeholder='Digite seu nome completo' 
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                    focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                    value={formData.username}
                    onChange={handleOnChange}
                    type="text" />
                    <p className='text-black absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                    Nome Completo
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>
                    
                    
                  </label>
                  )}
                  
                  {currentStep === 2 && (
                  <div className=''>

                    <label className="relative">
                    
                    <input 
                    required
                    type={isShow ? "text" : "password"}
                    name='password'
                    placeholder='Digite sua senha' 
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                    focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                    value={formData.password}
                    onChange={handleOnChange}
                    />
                    <p className='text-black absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 -top-[2px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                    Senha
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>

                    <div
                  onClick={handlePassword}
                  className="absolute top-[0px] right-[12px]"
                  
                  >
                  {!isShow && <Eye size={18} />}
                  {isShow && <EyeOff size={18} />}
                  </div>

                    </label>

                    <label className="relative flex flex-col">
                                      
                    <input 
                    required
                    type={isShow ? "text" : "password"}
                    name='confirmPassword'
                    placeholder='Confirme sua senha' 
                    className="mt-4 duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                    focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                    value={formData.confirmPassword}
                    onChange={handleOnChange}
                    />
                    <p className='text-black absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 bottom-[6px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                    Confirmar senha
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>

                    </label>

                    <label className="relative">
                                      
                    <input 
                    required
                    name='birth'
                    placeholder='Nascimento' 
                    className="mt-4 duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                    focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                    value={formData.birth}
                    onChange={handleOnChange}
                    type="date" />
                    <p className='text-black absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 -top-[2px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                    Nascimento
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>

                    </label>

                  </div>  
                    

                  )}
                  
                  {currentStep === 3 && (
                  <div className=''>

                    <label className="relative">
                    
                    <input 
                    required
                    name='email'
                    placeholder='Digite seu email' 
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                    focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                    value={formData.email}
                    onChange={handleOnChange}
                    type="text" />
                    <p className='text-black absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 -top-[2px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                    Email
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>

                    </label>

                    <label className="relative flex flex-col">
                                      
                    <input 
                    required
                    name='phone'
                    placeholder='(99) 9 9999 9999' 
                    className="mt-4 duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                    focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-full"
                    value={formData.phone}
                    onChange={handleOnChange}
                    type="text" />
                    <p className='text-black absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 bottom-[6px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                    Telefone
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>

                    </label>


                  </div>  
                    

                  )}
                
                
                <div className="flex justify-between">

                <button 
                onClick={(e)=> {
                  handleButtonBack(e)
                }}
                className='btn-back'>Voltar</button>

                <div className="">

                {
                  currentStep === steps.length
                  ? <button 
                  type='submit'
                  
                  className='btn-next'>Enviar</button>
                  : <button 
                  onClick={(e)=> {
                    handleButtonNext(e)
                    
                  }}
                  className='btn-next'>Próximo</button>
                }
                

                </div>
                
                  
                </div>
                

                </div>
                

            </form>
            <CardDescription className='my-8'>Se torne um membro para obter tokens<br/> ao realizar compras.</CardDescription>
            </CardContent>
            <CardFooter className='flex justify-center'>
              <p>Já possui uma conta ? <Link className='text-cyan-500' href={'/signin'}>Entrar.</Link></p>
            </CardFooter>
            </Card>
                    

            
        </div>

    
    
  )
}

export default page