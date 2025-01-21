import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { MdCloudUpload } from 'react-icons/md';
import {useDropzone} from 'react-dropzone'
import InputFileProduct from './InputFileProduct';
import { LuPackage } from 'react-icons/lu';
import axios from 'axios';
import { ProductsTypes } from '@/Types/ProductsTypes';
import { useParams } from 'next/navigation';
import InputFileProductList from './InputFileProductList';
const EditProductForm = () => {
    
    const [image, setImage] = useState<File | null>(null);
    const [imageList, setImageList] = useState<File[] | null>(null);
    const [dataProduct, setDataProduct] = useState<ProductsTypes|any>(null)
    const params = useParams()
    const locId = Number(params?.id)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        switch(e.target.name){

            case 'image':
                if (e.target.files){
                    console.log('e.atatab', e.target.files[0])
                    setImage(e.target.files[0])
                    
                }
                break;

            case 'imageList':
                if (e.target.files){
                    console.log('e.atatab', e.target.files)
                    setImageList([...e.target.files])
                    
                }
                break;
            
        }

    }

    const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=> {
            e.preventDefault()
            switch(e.target.name){

                default:
                    const newObj = {...dataProduct,[e.target.name]:e.target.value}
                    console.log('newObj', newObj)
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
            setDataProduct(result.data[locId-1])
        }
        fetchData();
      }, [])
    

  return (
    <>
    {dataProduct && (
        <form onSubmit={handleOnSubmit} className=' h-full w-full'>
        
        {/* <p className='text-sm text-gray-500 mb-8'>{selectedModalEdit?.name}</p> */}
        <div className='flex flex-col justify-center items-center w-[45%] h-[96%] mx-auto mt-2 bg-dashboard-800 rounded-md px-8 py-16 shadow-lg'>
        
        
        <h3 className='text-base font-black text-white mb-4 my-4'>Editar Produto</h3>
        
        
            
            <div className="grid grid-cols-4 gap-x-2">

                <label className="mt-4 relative col-span-2">
                    
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

            <div className="grid grid-cols-4 gap-x-2">

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

                 <label className="mt-4 relative col-span-3">
                        
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
                        Descrição de Desconto
                        </p>
                            
                            
                </label>

            </div>

            <div className="grid grid-cols-4 gap-x-2">

                
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
            
            <div className="grid grid-cols-2 gap-x-2 w-full">
            
                <InputFileProduct 
                image={image}
                setImage={setImage}
                handleFileChange={handleFileChange}/>

                <InputFileProductList
                imageList={imageList}
                setImageList={setImageList}
                handleFileChange={handleFileChange}
                />
            
            </div>

            <label className="mt-4 relative w-full">
                    
                    <textarea 
                    required
                    id='desc' 
                    name='desc'
                    placeholder='Descrição do produto'
                    className="duration-300 placeholder:opacity-0 focus:placeholder:opacity-100 placeholder:text-xs shadow-md text-neutral-500 border rounded-md outline-none 
                        peer pl-[16px] p-[6px] pt-[8px] bg-inherit w-full h-[128px]"
                    onChange={handleOnChangeTextArea}
                    value={dataProduct?.desc}
                    />
                    <p className='absolute
                    peer-focus:-translate-y-5 peer-focus:text-sm left-0 top-[8px] ml-2 px-2 duration-300 bg-dashboard-800 peer-valid:text-sm peer-valid:-translate-y-5'>
                    Descrição
                    <span 
                    className='text-red-500 ml-1'>
                    *</span>
                    </p>     
                            
            </label>

                

            
            <button className='bg-primary-900 hover:bg-primary-800 rounded-sm my-4 w-full p-2'>aaa</button>
            
                
                
            

        </div>
    </form>
    )}
    </>
    
  )
}

export default EditProductForm