import React, { ChangeEvent, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { MdCloudUpload } from 'react-icons/md'

interface InputProps {
    handleFileChange: (e: ChangeEvent<HTMLInputElement>)=> void,
    imageList: File[]|null,
    setImageList: (value:File[]) => void
}

const InputFileProductList = ({handleFileChange,imageList,setImageList}:InputProps) => {
    const onDrop = useCallback((files:File[])=>{
                setImageList(files)

    },[])
    
    const { getRootProps,getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
    })

  return (
    <div {...getRootProps()} className=''>
        <h2 className='my-4 text-sm text-center'>Imagem do Produto</h2>
        <input
        {...getInputProps}
        id='imageList'
        name='imageList'
        type="file"
        className='hidden'
        accept="image/*"
        multiple
        onChange={handleFileChange}
        
        
        />
        <label htmlFor="imageList" 
        
        className='cursor-pointer'>
            
            <div className={` rounded-md ${!imageList && 'border-2 border-dashed' } h-[160px] w-full
            border-gray-600 hover:border-gray-500 bg-dashboard-600 text-gray-400 hover:bg-dashboard-500 transition-all
            flex flex-col items-center justify-center`}>
                
            {imageList ? 
                    (
                        <>
                        <div className={
                            `grid w-full h-full
                                ${imageList.length >= 4 && 'grid-cols-2'}
                                ${imageList.length >= 8 && 'grid-cols-4'}
                                ${imageList.length >= 16 && 'grid-cols-8'}
                            `}>
                                {imageList.map((image,i)=>(
                                    <img key={i} src={URL.createObjectURL(image)} className={`overflow-hidden w-full h-full rounded-md`} alt="" />
                                ))}
                            </div>
                        
                        </>
                    )
                :
                    (
                        <>
                        {isDragActive ? 
                            (
                                <>
                                    <MdCloudUpload className='h-8 w-8 mx-auto'/>
                                    
                                    <p className='font-bold'>Solte para adicionar</p>
                                </>
                            ):
                                <>
                                    <MdCloudUpload className='h-8 w-8 mx-auto'/>
                                    <p className='mb-2 text-center'>
                                        
                                        <span className='font-bold text-xs'>Clique para enviar</span> ou arraste até aqui
                                    </p>

                                    <p>PNG, JPEG</p>
                                </>
                            }
                        </>
                    )
            }
                
                
            
                

            </div>
            
            
        </label>
    </div>
  )
}

export default InputFileProductList