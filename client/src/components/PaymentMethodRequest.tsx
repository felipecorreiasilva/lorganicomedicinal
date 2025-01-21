'use client'


import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CardContent } from './ui/card'
import axios from 'axios';
import { useProductsContext } from '@/context/CartContext';
import { useIdentificationContext } from '@/context/IdentificationContext';
import { usePaymentMethodContext } from '@/context/PaymentMethodContext';
import { useSendingToContext } from '@/context/SendingToContext';
import { useDeliveryMethodContext } from '@/context/DeliveryMethodContext';
import { useContactContext } from '@/context/MyContactContext';
import { FaPix } from 'react-icons/fa6';
import { FaCreditCard } from 'react-icons/fa';
import './payment.css'


const PaymentMethodRequest = () => {

    const router = useRouter();
    const { emailContact, setEmailContact, verifiedEmailContact, setVerifiedEmailContact } = useContactContext();
    const { deliveryMethod, setDeliveryMethod, verifiedDeliveryMethod, setVerifiedDeliveryMethod } = useDeliveryMethodContext();
    const {sendingToData, verifiedSendingTo, setVerifiedSendingTo} = useSendingToContext();

    const { 

        firstname,
        lastname,
        country,
        cep,
        adresses,
        houseNumber,
        cityComplement,
        neighborhood,
        city,
        uf

    } = sendingToData;

    const { identificationData, setIdentificationData } = useIdentificationContext();
    const {identificationType,cnpj,cpf,phone} = identificationData
    const { paymentMethod, setPaymentMethod, verifiedPaymentMethod, setVerifiedPaymentMethod } = usePaymentMethodContext();
    const {products,clearCart} = useProductsContext();
    const totalPrice = products.reduce((total, product) => total + (product.price * product.amountProduct), 0);
    
    const [buttonLoading, setButtonLoading] = useState(false)
    const [isSelected, setIsSelected] = useState<boolean>(false)

    const handleChangePaymentMethod = () => {
        setVerifiedPaymentMethod(false)
    }

    const handleOnChange = (e:any)=> {
        // e.preventDefault()

        switch(e.target.name){
          
            default:
              const newValue = e.target.value
              setPaymentMethod(newValue)
              break;
           
        }
     
    }

    const handleOnSubmit = async(e:any) => {
        e.preventDefault()
        
        setVerifiedPaymentMethod(false)

        setButtonLoading(true);

                const unmaskCpf = cpf?.replace('.', '').replace('.', '').replace('-', '')
                const unmaskCnpj = cnpj?.replace('.', '').replace('.', '').replace('/', '').replace('-', '')
                const unmaskPhone = phone?.replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
                console.log('unmaskCnpj: ', unmaskCnpj)
                // console.log('totalPrice: ', 375.58.toFixed(2))
                console.log('totalPrice: ', totalPrice.toFixed(2))
                const paymentData = {
                    
                    emailContact,
                    firstname,
                    lastname,
                    country,
                    cep,
                    adresses,
                    houseNumber,
                    cityComplement,
                    neighborhood,
                    city,
                    uf,
                    deliveryMethod,
                    identificationType,
                    cpf: unmaskCpf,
                    cnpj: unmaskCnpj,
                    phone: unmaskPhone,
                    products,
                    totalPrice,
                    paymentMethod
                    
                }
                setPaymentMethod(paymentMethod)
                
                switch (paymentMethod) {
                    case 'pix':
                        const result = await axios.post('http://localhost:3001/newOrder/pix', paymentData)
                        // const resultc = await axios.get('http://localhost:3001/newOrder/v2/cob')
                        // console.log('dataC: ', resultc.data)
                        console.log('data: ', result.data)
                        const locId = result?.data?.cobranca?.loc?.id
                        const newOrderData = {
                            id: locId,
                            txid: result.data.cobranca.txid,
                            pixCopiaECola: result.data.cobranca.pixCopiaECola,
                            imagemQrcode: result.data.qrcode.imagemQrcode,
                            ...paymentData,
                            cep: parseInt(cep),
                            country: 'Brasil',
                            
                        }
                        
                        const createNewOrder = await axios.post('http://localhost:3001/createNewOrder', newOrderData)
                        console.log('createNewOrder: ', createNewOrder)
                        
                        // clearCart()
                        router.push(`/newOrder/v2/loc/${locId}/pixQrCode`);
                        break;

                    case 'credit_card':
                        console.log('resultssssasdasdsasdads')
                        const resultB = await axios.post('http://localhost:3001/newOrder/credit_card', paymentData)
                        const resultDataB = await resultB.data
                        console.log('resultssss',resultDataB)

                        alert('Ainda não liberamos esse metódo de pagamento, utilize o metódo de pagamento pix.')
                        setButtonLoading(false);
                    break;

                    
                }
    }

  return (
    <>
        
            
                
            
                <>
                    <CardContent>
                    
                        <div className="flex flex-col justify-center items-center space-y-8">
                        <h1 className='my-[64px] uppercase text-sm opacity-60'>Escolha de pagamento</h1>


                        {isSelected === false ? (
                            <>
                                <div className='relative w-full h-full'>

                                    <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="pix"
                                    className='sr-only peer'
                                    required
                                    value='pix'
                                    onChange={handleOnChange}
                                    />

                                    <label
                                    htmlFor='pix'
                                    className="flex text-start p-4 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl peer-checked:bg-black peer-checked:text-white cursor-pointer transition">
                                    <FaPix className='size-32 lg:size-6 mr-16 ml-16 my-auto' />
                                        <div className=''>
                                            <h6 className=''>Pix</h6>
                                            <span className='text-xs opacity-60'>Pagando por Pix, seu pagamento será confirmado em poucos segundos.<br/>aproveite nossos recursos.</span>
                                        </div>
                                        
                                    </label>

                                    <div className="flex absolute top-0 right-4 bottom-0 w-7 h-7 my-auto rounded-full bg-gray-800 scale-0 peer-checked:scale-100 transition delay-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                    </svg>
                                    </div>

                                    </div>

                                    <div className='relative w-full'>

                                    <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="credit_card"
                                    className='sr-only peer'
                                    required
                                    
                                    value='credit_card'
                                    onChange={handleOnChange}
                                    />

                                    <label
                                    htmlFor='credit_card'
                                    className="flex text-start p-4 py-6 rounded-xl bg-white bg-opacity-90 backdrop-blur-2xl shadow-xl peer-checked:bg-black peer-checked:text-white cursor-pointer transition">
                                    <FaCreditCard className='size-32 lg:size-6 mr-16 ml-16 my-auto' />
                                        <div className=''>
                                        <h6 className=''>Cartão de Crédito</h6>
                                        
                                        <span className='text-xs opacity-60'>Aceitamos pagamentos com cartão de crédito, <br/>aproveite nossos recursos.</span>
                                        
                                        </div>
                                        
                                    </label>

                                    <div className="flex absolute top-[46px] right-4 w-7 h-7 my-auto rounded-full bg-gray-900 scale-0 peer-checked:scale-100 transition delay-100 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 text-white my-auto mx-auto" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                                    </svg>
                                    </div>

                                    

                                    </div>

                                    
                                    
                            
                            </>
                        ):<>

                            <form id="form-checkout">
                                <div id="form-checkout__cardNumber" className="containerpay"></div>
                                <div id="form-checkout__expirationDate" className="containerpay"></div>
                                <div id="form-checkout__securityCode" className="containerpay"></div>
                                <input type="text" id="form-checkout__cardholderName" />
                                <select id="form-checkout__issuer"></select>
                                <select id="form-checkout__installments"></select>
                                <select id="form-checkout__identificationType"></select>
                                <input type="text" id="form-checkout__identificationNumber" />
                                <input type="email" id="form-checkout__cardholderEmail" />

                                <button type="submit" id="form-checkout__submit">Pagar</button>
                                <progress value="0" className="progress-bar">Carregando...</progress>
                            </form>
                        
                        </>
                        // <form>

                        //     <div className='space-y-4 flex flex-col'>

                        //     <label className="relative">
                                
                        //         <input 
                        //         required
                        //         name='cardNumber'
                        //         placeholder='Digite seu número de cartão' 
                        //         className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        //         focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                        //         value={emailContact}
                        //         onChange={e => setEmailContact(e.target.value)}
                        //         type="text" />
                        //         <p className='text-black absolute
                        //         peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                        //         N° Cartão
                        //         <span 
                        //         className='text-red-500 ml-1'>
                        //         *</span>
                        //         </p>

                        //     </label>

                        //     <label className="relative">
                                
                        //         <input 
                        //         required
                        //         name='cardDateExpiration'
                        //         placeholder='Data de vencimento - EX: 11/25' 
                        //         className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        //         focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                        //         value={emailContact}
                        //         onChange={e => setEmailContact(e.target.value)}
                        //         type="text" />
                        //         <p className='text-black absolute
                        //         peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                        //         Data de Vencimento
                        //         <span 
                        //         className='text-red-500 ml-1'>
                        //         *</span>
                        //         </p>

                        //     </label>

                        //     <label className="relative">
                                
                        //         <input 
                        //         required
                        //         name='cardSecurityCode'
                        //         placeholder='Digite seu código de segurança' 
                        //         className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        //         focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                        //         value={emailContact}
                        //         onChange={e => setEmailContact(e.target.value)}
                        //         type="text" />
                        //         <p className='text-black absolute
                        //         peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                        //         Código de Segurança
                        //         <span 
                        //         className='text-red-500 ml-1'>
                        //         *</span>
                        //         </p>

                        //     </label>

                        //     <label className="relative">
                                
                        //         <input 
                        //         required
                        //         name='cardHolder'
                        //         placeholder='Digite o titular de cartão' 
                        //         className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        //         focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                        //         value={emailContact}
                        //         onChange={e => setEmailContact(e.target.value)}
                        //         type="text" />
                        //         <p className='text-black absolute
                        //         peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                        //         Titular do Cartão
                        //         <span 
                        //         className='text-red-500 ml-1'>
                        //         *</span>
                        //         </p>

                        //     </label>

                        //     <label className="relative mt-8">

                        //         <select
                                    
                        //             name="cardIssuer"
                        //             id="cardIssuer"
                        //             className='duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        //             focus:border-stone-950 peer pl-[16px] p-[9px] bg-inherit w-[256px]'
                        //             onChange={handleOnChange}
                        //             value={sendingToData?.uf}
                        //         >
                        //             <option value=''>Mastercard</option>
                        //             <option value=''>Visa</option>
                        //             {/* {
                                        
                        //             _listUf?.map((uf:any) => (<option key={uf.id} value={uf.sigla}>{uf.nome}</option>))
                        //             } */}
                                    
                        //         </select>
                        //         <p className='text-black absolute
                        //         peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[9px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                        //         Tipo do Cartão
                        //         <span 
                        //         className='text-red-500 ml-1'>
                        //         *</span>
                        //         </p>

                        //     </label>

                        //     <label className="relative mt-8">

                        //         <select
                                    
                        //             name="cardIssuer"
                        //             id="cardIssuer"
                        //             className='duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        //             focus:border-stone-950 peer pl-[16px] p-[9px] bg-inherit w-[256px]'
                        //             onChange={handleOnChange}
                        //             value={sendingToData?.uf}
                        //         >
                        //             <option value=''>1x parcela de R$1,50</option>
                        //             <option value=''>2x parcela de R$0,75</option>
                        //             {/* {
                                        
                        //             _listUf?.map((uf:any) => (<option key={uf.id} value={uf.sigla}>{uf.nome}</option>))
                        //             } */}
                                    
                        //         </select>
                        //         <p className='text-black absolute
                        //         peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[9px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                        //         Parcela
                        //         <span 
                        //         className='text-red-500 ml-1'>
                        //         *</span>
                        //         </p>

                        //     </label>

                        //     </div>

                        // </form>
                        
                        }

                        </div>

                        {paymentMethod === 'credit_card' && (
                        
                        <button onClick={()=>setIsSelected(true)} className='p-4 rounded mb-8 mt-16 w-full bg-slate-800 
                        hover:bg-slate-800/95 text-white'>Próximo</button>

                        )}

                        

                        {paymentMethod === 'pix' && 
                        
                        (
                            <button onClick={(e)=>handleOnSubmit(e)} className='p-[16px] rounded mb-8 mt-16 uppercase bg-primary-800 w-full 
                            hover:bg-primary-700 text-white'>Finalizar Pedido</button>
                        )}
                        
                        
                    
                    
                </CardContent>
                
                </>

            
            
        
        
        </>
  )
}

export default PaymentMethodRequest