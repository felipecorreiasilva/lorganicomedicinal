"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { usePaymentMethodContext } from '@/context/PaymentMethodContext';
import { useSendingToContext } from '@/context/SendingToContext';
import { TbCopy, TbCopyCheck } from 'react-icons/tb';
import { Card, CardContent } from '@/components/ui/card';

interface ordersManagerDataType {
    
    id: number,
    txid: string,
    firstname: string,
    lastname: string,
    uf: string,
    city: string,
    neighborhood: string,
    adresses: string,
    imagemQrcode: string,
    pixCopiaECola: string,
    price: number
}

export default function page() {
    const [ordersManagerData, setordersManagerData] = useState<ordersManagerDataType>(
        {
            id:0,txid:'',firstname:'',lastname:'',uf:'',city:'',neighborhood:'',
            adresses:'', imagemQrcode:'',pixCopiaECola:'', price: 0
        });
    
    const [ clipboardState, setClipboardState ] = useState(false)

    const [copyToClipboard, setCopyToClipboard] = useState("");

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(copyToClipboard)
      .then(() => {
        setClipboardState(true);
      })
      .catch((error) => {
        console.error("Error copying text: ", error);
      });
  };

        const { 
    
            sendingToData,
            setSendingToData,
            verifiedSendingTo,
            setVerifiedSendingTo
        
        } = useSendingToContext();

    const params = useParams()
    const locId = params?.id

    useEffect(() => {
        const handleGetordersManagerData = async () => {

            const _urlQrCode = "http://localhost:3001/ordersManager/v2/loc/"+locId+"/pixQrCode"
            const _urlLocId = "http://localhost:3001/ordersManager/v2/loc/"+locId
            const resultQrCode = await axios.get(_urlQrCode)
            const resultLocId = await axios.get(_urlLocId)

            const txid = resultLocId.data.txid
            
            const dataQrCode = resultQrCode.data
            const _urlCob = "http://localhost:3001/ordersManager/v2/cob/"+txid
            const  _urlOrdersManager = "http://localhost:3001/ordersManager"
            
            const resultCob = await axios.get(_urlCob)
            const dataCob = resultCob.data

            console.log('dataCob', dataCob)

            const splitUsername = (dataCob.devedor.nome).split(' ')
            const ordersManager = await axios.get(_urlOrdersManager)

            console.log('ordersManager: ', ordersManager)

            const data:ordersManagerDataType = {

                id: Number(locId),
                txid: txid,
                firstname: splitUsername[0],
                lastname: splitUsername[1],
                uf: sendingToData.uf,
                city: sendingToData.city,
                neighborhood: sendingToData.neighborhood,
                adresses: sendingToData.adresses,
                imagemQrcode: dataQrCode.imagemQrcode,
                pixCopiaECola: dataCob.pixCopiaECola,
                price: dataCob.valor.original
                
    
            }

            console.log('data: ', data)
            setCopyToClipboard(dataCob.pixCopiaECola)
            setordersManagerData({...data})
            
        }
        handleGetordersManagerData()
        
    }, []);

  return (
    <>
    {ordersManagerData.imagemQrcode != '' && (
        <div className='bg-white h-full pt-[200px] flex  flex-col justify-center items-center py-16 text-black/70'>
        <Card>
            <CardContent className='flex flex-col justify-center items-center py-[96px] px-[320px]'>
                
                    
                    <div className='text-center font-medium'>
                    <h2 className='text-2xl'>Pedido Realizado</h2>
                    
                        <p className='mt-4 break-words'>ID da Transação: {ordersManagerData.txid}</p>
                        <p>Para: {ordersManagerData.firstname} {ordersManagerData.lastname}</p>
                        <p>Estado: {ordersManagerData.uf}, Cidade: {ordersManagerData.city}</p>
                        <p>Bairro: {ordersManagerData.neighborhood}, Rua: {ordersManagerData.adresses}</p>
                        
                        
                    </div>

                    <p className='font-bold text-black text-center mt-8'>R${ordersManagerData.price}</p>
                    
                    <img className='h-[350px] my-8' src={ordersManagerData.imagemQrcode} />
                    
                    <div className='flex p-2 rounded-md space-x-6 bg-black text-white'>

                    <p className='max-w-[128px] whitespace-nowrap overflow-x-auto'>{copyToClipboard}</p>
                    
                    <button onClick={handleCopyToClipboard} className='flex justify-center items-center m-auto'>
                    {clipboardState ? 
                    <TbCopyCheck size={40}/> 
                    : 
                    <TbCopy size={40}/>}
                    </button>
                    
                    </div>
                    
                    
                
            </CardContent>
        </Card>
    </div>
    )}
    
    </>
    
    
        
            
    
    
  )
}