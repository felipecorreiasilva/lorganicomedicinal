import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { MdCloudUpload } from 'react-icons/md';
import {useDropzone} from 'react-dropzone'
import InputFileProduct from './InputFileProduct';
import { LuPackage } from 'react-icons/lu';
import axios from 'axios';
import { ProductsTypes } from '@/Types/ProductsTypes';
import { useParams } from 'next/navigation';
import InputFileProductList from './InputFileProductList';
import { BoxProductsTypes } from '@/Types/BoxProductsTypes';
const EditProductForm = () => {
    
    const [dataProduct, setDataProduct] = useState<ProductsTypes|any>(null)
    const [currentStep, setCurrentStep] = useState(1)
    const params = useParams()
    const locId = Number(params?.id)

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=> {
            e.preventDefault()
            switch(e.target.name){

                default:
                    const newObj = {...dataProduct,[e.target.name]:e.target.value}
                    console.log('newObj', newObj)
                    console.log('e.target.value', e.target.value)
                    setDataProduct(newObj)
                    break;
                
            }
            
    }

    const ChangeBoxProductsP = (e:ChangeEvent<HTMLInputElement>)=> {
            e.preventDefault()
            switch(e.target.name){

                default:
                    
                    const updateBoxProducts = dataProduct.boxProducts.map((box:BoxProductsTypes)=>{

                        const isSize = (box.size == 'P')
                        
                        const newObj = {
                            size: box.size, 
                            height: (e.target.name =='height_P' && isSize) ? Number(e.target.value):box.height,
                            width: (e.target.name =='width_P' && isSize) ? Number(e.target.value):box.width, 
                            _length: (e.target.name =='_length_P' && isSize) ? Number(e.target.value):box._length,
                            weight: (e.target.name =='weight_P' && isSize) ? Number(e.target.value):box.weight,
                        }
                        return newObj

                    })
                    const newObj = {...dataProduct,boxProducts:updateBoxProducts}
                    setDataProduct(newObj)
                    break;
                
            }
            
    }

    const ChangeBoxProductsM = (e:ChangeEvent<HTMLInputElement>)=> {
            e.preventDefault()
            switch(e.target.name){

                default:
                    
                    const updateBoxProducts = dataProduct.boxProducts.map((box:BoxProductsTypes)=>{

                        const isSize = (box.size == 'M')
                        
                        const newObj = {
                            size: box.size, 
                            height: (e.target.name =='height_M' && isSize) ? Number(e.target.value):box.height,
                            width: (e.target.name =='width_M' && isSize) ? Number(e.target.value):box.width, 
                            _length: (e.target.name =='_length_M' && isSize) ? Number(e.target.value):box._length,
                            weight: (e.target.name =='weight_M' && isSize) ? Number(e.target.value):box.weight,
                        }
                        return newObj

                    })
                    const newObj = {...dataProduct,boxProducts:updateBoxProducts}
                    setDataProduct(newObj)
                    break;
                
            }
            
    }

    const ChangeBoxProductsG = (e:ChangeEvent<HTMLInputElement>)=> {
            e.preventDefault()
            switch(e.target.name){

                default:
                    
                    const updateBoxProducts = dataProduct.boxProducts.map((box:BoxProductsTypes)=>{

                        const isSize = (box.size == 'G')
                        
                        const newObj = {
                            size: box.size, 
                            height: (e.target.name =='height_G' && isSize) ? Number(e.target.value):box.height,
                            width: (e.target.name =='width_G' && isSize) ? Number(e.target.value):box.width, 
                            _length: (e.target.name =='_length_G' && isSize) ? Number(e.target.value):box._length,
                            weight: (e.target.name =='weight_G' && isSize) ? Number(e.target.value):box.weight,
                        }
                        return newObj

                    })
                    const newObj = {...dataProduct,boxProducts:updateBoxProducts}
                    setDataProduct(newObj)
                    break;
                
            }
            
    }

    const handleOnChangeTextArea = (e:ChangeEvent<HTMLTextAreaElement>)=> {
            e.preventDefault()
            switch(e.target.name){

                default:
                    const newObj = {...dataProduct,[e.target.name]:e.target.value}
                    console.log('newObj', newObj)
                    setDataProduct(newObj)
                    break;
                
            }
            
    }

    const handleOnSubmit = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = 'http://localhost:3001/products/editProduct/'+locId
        console.log('dataProduct: ', dataProduct)
        const result = await axios.put(url,dataProduct)
        console.log(result.data)

    }
    

    useEffect(() => {
        const fetchData = async () => {
            const _url = 'http://localhost:3001/products'
            const result = await axios.get(_url)
            console.log(result)
            const newObj = {
                ...result.data[locId-1],
                boxProducts: JSON.parse(result.data[locId-1].boxProducts)
            }
            console.log('newObj', newObj)
            setDataProduct(newObj)
        }
        fetchData();
      }, [])
    

  return (
    <>
    {dataProduct && (
        <form onSubmit={handleOnSubmit} className=' h-full w-full'>
        
        {/* <p className='text-sm text-gray-500 mb-8'>{selectedModalEdit?.name}</p> */}
        <div className='flex flex-col justify-center items-center sm:w-[512px] h-full sm:mx-auto bg-dashboard-800 rounded-md px-8 pt-12 pb-4 shadow-lg'>
        
        
        <h3 className='text-base font-black text-white mb-4 my-4'>Editar Produto</h3>
        
        
            
            
            {currentStep == 1 && (
                
                <>
                <div className="grid sm:grid-cols-4 grid-cols-1 sm:gap-x-2">

                    <label className="mt-4 relative sm:sm:col-span-2">
                        
                        <input 
                        required
                        id='name' 
                        name='name'
                        placeholder='Digite nome do produto'
                        className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                            peer pl-[16px] p-[6px] bg-inherit w-full"
                        onChange={handleOnChange}
                        value={dataProduct?.name}
                        type="text" />
                        <p className='absolute
                        peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                        Nome
                        <span 
                        className='text-red-500 ml-1'>
                        *</span>
                        </p>
                                
                                
                    </label>

                    <label className="mt-4 relative">
                        
                        <input 
                        required
                        id='price' 
                        name='price'
                        placeholder='Valor do produto'
                        className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                            peer pl-[16px] p-[6px] bg-inherit w-full"
                        onChange={handleOnChange}
                        value={dataProduct?.price}
                        type="text" />
                        <p className='absolute
                        peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                        Valor
                        <span 
                        className='text-red-500 ml-1'>
                        *</span>
                        </p>
                                
                                
                    </label>

                    <label className="mt-4 relative">
                        
                        <input 
                        required
                        id='oldPrice' 
                        name='oldPrice'
                        placeholder='Antigo Valor'
                        className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                            peer pl-[16px] p-[6px] bg-inherit w-full"
                        onChange={handleOnChange}
                        value={dataProduct?.oldPrice}
                        type="text" />
                        <p className='absolute
                        peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                        Ant. Valor
                        </p>
                                
                                
                    </label>

                </div>

                <div className="grid sm:grid-cols-4 grid-cols-1 gap-x-2">

                <label className="mt-4 relative">
                        
                        <input 
                        required
                        id='discount' 
                        name='discount'
                        placeholder='D. do produto'
                        className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                        onChange={handleOnChange}
                        value={dataProduct?.discount}
                        type="text" />
                        <p className='absolute
                        peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                        Desconto
                        </p>
                            
                            
                </label>

                <label className="mt-4 relative sm:col-span-3">
                        
                        <input 
                        required
                        id='discountDesc' 
                        name='discountDesc'
                        placeholder='Descrição de desconto'
                        className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                        onChange={handleOnChange}
                        value={dataProduct?.discountDesc}
                        type="text" />
                        <p className='absolute
                        peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                        Desc. Desconto
                        </p>
                            
                            
                </label>

                </div>

                <h5 className='mt-4'>Volumes do Produto</h5>
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-2">


                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='height' 
                    name='height'
                    placeholder='Altura'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={handleOnChange}
                    value={dataProduct?.height}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    Altura
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='width' 
                    name='width'
                    placeholder='Largura'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={handleOnChange}
                    value={dataProduct?.width}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    Largura
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='_length' 
                    name='_length'
                    placeholder='Comprimento'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={handleOnChange}
                    value={dataProduct?._length}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    Comp
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='weight' 
                    name='weight'
                    placeholder='Peso'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={handleOnChange}
                    value={dataProduct?.weight}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    Peso
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   


                </div>

                <button onClick={e => setCurrentStep(2)} className='bg-primary-900 hover:bg-primary-800 mt-16 rounded-sm my-4 w-full p-2'>Próximo</button>
                </>
                
            )
        }

        {currentStep == 2 && (
            <>
            
                <h5 className='mt-4'>Caixa Pequena</h5>
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-2">


                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='height_P' 
                    name='height_P'
                    placeholder='C.Altura'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                    peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsP}
                    value={dataProduct?.boxProducts[0]?.height}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Altura
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='width_P' 
                    name='width_P'
                    placeholder='C.Largura'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsP}
                    value={dataProduct?.boxProducts[0]?.width}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Largura
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='_length_P' 
                    name='_length_P'
                    placeholder='C.Comp'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsP}
                    value={dataProduct?.boxProducts[0]?._length}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Comp
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='weight_P' 
                    name='weight_P'
                    placeholder='C.Peso'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsP}
                    value={dataProduct?.boxProducts[0]?.weight}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Peso
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   


                </div>

                <h5 className='mt-4'>Caixa Media</h5>
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-2">


                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='height_M' 
                    name='height_M'
                    placeholder='C.Altura'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsM}
                    value={dataProduct?.boxProducts[1]?.height}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Altura
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='width_M' 
                    name='width_M'
                    placeholder='C.Largura'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsM}
                    value={dataProduct?.boxProducts[1]?.width}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Largura
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='_length_M' 
                    name='_length_M'
                    placeholder='C.Comp'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsM}
                    value={dataProduct?.boxProducts[1]?._length}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Comp
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='weight_M' 
                    name='weight_M'
                    placeholder='C.Peso'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsM}
                    value={dataProduct?.boxProducts[1]?.weight}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Peso
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   


                </div>

                <h5 className='mt-4'>Caixa Grande</h5>
                <div className="grid sm:grid-cols-4 grid-cols-2 gap-x-2">


                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='height_G' 
                    name='height_G'
                    placeholder='C.Altura'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsG}
                    value={dataProduct?.boxProducts[2]?.height}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Altura
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='width_G' 
                    name='width_G'
                    placeholder='C.Largura'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsG}
                    value={dataProduct?.boxProducts[2]?.width}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Largura
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='_length_G' 
                    name='_length_G'
                    placeholder='C.Comp'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsG}
                    value={dataProduct?.boxProducts[2]?._length}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Comp
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   

                <label className="mt-4 relative">
                    
                    <input 
                    required
                    id='weight_G' 
                    name='weight_G'
                    placeholder='C.Peso'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] bg-inherit w-full"
                    onChange={ChangeBoxProductsG}
                    value={dataProduct?.boxProducts[2]?.weight}
                    type="text" />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    C.Peso
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
                </label>   


                </div>

                <div className="grid grid-cols-2 gap-x-4 mt-8">
                <button onClick={e => setCurrentStep(1)} className='bg-primary-900 hover:bg-primary-800 rounded-sm my-4 sm:w-[160px] w-[80px] p-2'>Voltar</button>
                <button onClick={e => setCurrentStep(3)} className='bg-primary-900 hover:bg-primary-800 rounded-sm my-4 sm:w-[160px] w-[80px] p-2'>Próximo</button>

                </div>
            </>
        )}

        {currentStep == 3 && (
            <>
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-2 w-full">
            
                <InputFileProduct/>
                <InputFileProductList/>
            
            </div>

            <label className="mt-4 relative w-full">
                    
                    <textarea 
                    required
                    id='desc' 
                    name='desc'
                    placeholder='Descrição do produto'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] pt-[8px] bg-inherit w-full sm:h-[128px] h-[160px] mt-4"
                    onChange={handleOnChangeTextArea}
                    value={dataProduct?.desc}
                    />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[24px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    Descrição
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
            </label>

                
                <div className="grid grid-cols-2 gap-x-4 mt-8 ">
                <button onClick={e => setCurrentStep(2)} className='bg-primary-900 hover:bg-primary-800 rounded-sm my-4 sm:w-[160px] w-[80px] p-2'>Voltar</button>
                <button type='submit' className='bg-primary-900 hover:bg-primary-800 rounded-sm my-4 sm:w-[160px] w-[80px] p-2'>Atualizar</button>

                </div>
                
                </>
        )}

            
            
            
                
                
            

        </div>
    </form>
    )}
    </>
    
  )
}

export default EditProductForm