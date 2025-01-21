import React, { useEffect, useState } from 'react'
import { CardContent } from './ui/card'
import { MdVerified } from 'react-icons/md'
import { useSendingToContext } from '@/context/SendingToContext'
import { InputMask } from '@/utils/InputMask'
import axios from 'axios'

const SendingToRequest = () => {
    const { 

        sendingToData,
        setSendingToData,
        verifiedSendingTo,
        setVerifiedSendingTo

    } = useSendingToContext();

    const [_listUf, setListUf] = useState<any[]>([])

    const handleOnChange = (e:any)=> {
        e.preventDefault()
        switch(e.target.name){

            case 'cep':
                const cepObj = {...sendingToData,[e.target.name]:InputMask('cep',e.target.value)}
                setSendingToData(cepObj)
                break;
          
            default:
                const newObj = {...sendingToData,[e.target.name]:e.target.value}
                setSendingToData(newObj)
                break;
           
        }
     
    }

    useEffect(() => {
        const handleGetUf = async() => {
            const burl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
      
            let listUf = (await axios.get(burl)).data
            setListUf(listUf)
          }
          handleGetUf()
        
    }, []);

    const handleOnBlurCep = (ev:any) => {

        const { value } = ev.target;

        const unmaskCep = value?.replace(/[^0-9]/g, '');

        if (unmaskCep?.length !== 8) {
            return;
        }

        fetch(`https://viacep.com.br/ws/${unmaskCep}/json/`)
            .then((res) => res.json())
            .then((data) => {

                setSendingToData({
                    ...sendingToData, 
                    adresses: data.logradouro, 
                    neighborhood: data.bairro,
                    city: data.localidade,
                    uf: data.uf
                })


            })

    }

    const handleOnChangeAdresses = () => {
        setVerifiedSendingTo(false)
        console.log('verifiedSendingTo')
    }

    const handleOnSubmit = (e:any) => {
        e.preventDefault()
        const unmaskCep = sendingToData.cep?.replace(/[^0-9]/g, '');
        setSendingToData({...sendingToData, cep: unmaskCep})
        setVerifiedSendingTo(true)
    }

  return (
    <>
            
                
            {!verifiedSendingTo ? (
                <>
                    <CardContent>
                    <form onSubmit={handleOnSubmit}>
                    <h1 className='my-[64px] uppercase text-sm opacity-60 flex justify-center items-center'>Dados para entrega</h1>
                        <div className="flex">

                        <div className="grid grid-cols-4">
                        
                            <label className="mt-4 relative col-span-2">
                        
                                <input 
                                required
                                id='firstname' 
                                name='firstname'
                                placeholder='Digite seu nome'
                                className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                                onChange={handleOnChange}
                                value={sendingToData?.firstname}
                                type="text" />
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                Nome
                                <span 
                                className='text-red-500 ml-1'>
                                *</span>
                                </p>
                            
                            
                            </label>
                            
                            <label className="mt-4 relative">
                        
                                <input 
                                required
                                id='lastname' 
                                name='lastname'
                                placeholder='Digite seu sobrenome'
                                className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                                onChange={handleOnChange}
                                value={sendingToData?.lastname}
                                type="text" />
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                Sobrenome
                                <span 
                                className='text-red-500 ml-1'>
                                *</span>
                                </p>

                            </label>

                            <div className="mt-4 flex flex-col col-start-1 ml-4">

                                <label className='text-xs font-medium text-gray-600 my-2'>País&nbsp;<span className='text-red-600'>*</span></label>
                                <p className='font-semibold text-sm' >Brasil</p>

                            </div>

                            <label className="relative mt-8 col-start-1">
                        
                                <input 
                                required
                                id='cep' 
                                name='cep'
                                placeholder='Digite seu CEP'
                                className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                                onChange={handleOnChange}
                                onBlur={(ev) => handleOnBlurCep(ev)}
                                value={sendingToData?.cep}
                                type="text" />
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                CEP
                                <span 
                                className='text-red-500 ml-1'>
                                *</span>
                                </p>

                            </label>

                            <label className="relative mt-8 col-start-1 col-span-3">
                        
                                <input 
                                required
                                id='adresses' 
                                name='adresses'
                                placeholder='Digite seu endereço'
                                className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[384px]"
                                onChange={handleOnChange}
                                onBlur={(ev) => handleOnBlurCep(ev)}
                                value={sendingToData?.adresses}
                                type="text" />
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                Endereço
                                <span 
                                className='text-red-500 ml-1'>
                                *</span>
                                </p>

                            </label>

                            <label className="relative mt-8 col-start-4 col-span-1">
                        
                                <input 
                                required
                                id='houseNumber' 
                                name='houseNumber'
                                placeholder='N° Residência'
                                className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[128px]"
                                onChange={handleOnChange}
                                value={sendingToData?.houseNumber}
                                type="text" />
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                Número
                                <span 
                                className='text-red-500 ml-1'>
                                *</span>
                                </p>

                            </label>

                            <label className="relative mt-8">
                        
                                <input
                                id='cityComplement' 
                                name='cityComplement'
                                placeholder='Apartamento,unidade,prédio,andar,etc.'
                                className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[540px]"
                                onChange={handleOnChange}
                                value={sendingToData?.cityComplement}
                                type="text" />
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                Complemento
                                </p>

                            </label>

                            <label className="relative mt-8 col-start-1">
                        
                                <input 
                                required
                                id='neighborhood' 
                                name='neighborhood'
                                placeholder='Digite seu CEP'
                                className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                                onChange={handleOnChange}     
                                value={sendingToData?.neighborhood}
                                type="text" />
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                Bairro
                                <span 
                                className='text-red-500 ml-1'>
                                *</span>
                                </p>

                            </label>

                            <label className="mt-8 relative col-span-2 col-start-1">
                        
                                <input 
                                required
                                id='city' 
                                name='city'
                                placeholder='Digite sua cidade'
                                className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                focus:border-stone-950 peer pl-[16px] p-[6px] bg-inherit w-[256px]"
                                onChange={handleOnChange}
                                value={sendingToData?.city}
                                type="text" />
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                Cidade
                                <span 
                                className='text-red-500 ml-1'>
                                *</span>
                                </p>

                            </label>

                            <label className="relative mt-8">
                        
                                <select
                                    
                                    name="uf"
                                    id="uf"
                                    className='duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                                    focus:border-stone-950 peer pl-[16px] p-[8px] bg-inherit w-[256px]'
                                    onChange={handleOnChange}
                                    value={sendingToData?.uf}
                                >
                                    <option value=''>Selecione um estado</option>
                                    {
                                        
                                    _listUf?.map((uf:any) => (<option key={uf.id} value={uf.sigla}>{uf.nome}</option>))
                                    }
                                    
                                </select>
                                <p className='text-black absolute
                                peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-white peer-valid:text-sm peer-valid:-translate-y-5'>
                                Estado
                                <span 
                                className='text-red-500 ml-1'>
                                *</span>
                                </p>

                            </label>

                        </div>

                        

                        </div>
                        
                        <button type="submit" className='p-4 rounded mb-4 mt-16 w-full bg-slate-800 hover:bg-slate-800/95 text-white'>Próximo</button>
                    
                    </form>
                </CardContent>
                
                </>

            ):(
                <>
                    <CardContent className='mt-4'>
                    <div className='flex justify-between overflow-auto p-5 text-xs border-gray-300 bg-white rounded shadow'>
                
                <h2 className='font-bold text-[#424242] text-xs mb-2 flex'>
                <MdVerified />
                &nbsp;ENTREGA
                </h2>

                

                <div className='flex flex-col text-start'>
                    <p className='font-bold text-black'>{sendingToData?.firstname} {sendingToData?.lastname}</p>
                    <p>{sendingToData?.adresses}, {sendingToData?.houseNumber}</p>
                    <p>{sendingToData?.neighborhood}, 
                    &nbsp;{sendingToData?.city}
                    &nbsp;/ ({sendingToData?.uf})
                    </p>
                    <p>
                        
                <br/>
                </p> 
                </div>
                    
                    

                    <button onClick={handleOnChangeAdresses} className='font-bold underline'>
                    Alterar
                    </button>       
                
                
            </div>
                        
                    </CardContent>
                </>
                
            )}
            
        
        
        </>
  )
}

export default SendingToRequest