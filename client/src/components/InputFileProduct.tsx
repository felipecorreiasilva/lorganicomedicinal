import React, { ChangeEvent, useCallback, useState } from 'react'
import { DropzoneState, useDropzone } from 'react-dropzone'
import { MdCloudUpload } from 'react-icons/md'



const InputFileProduct = () => {
    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault()
    
            switch(e.target.name){
    
                case 'image':
                    if (e.target.files){
                        console.log('e.atatab', e.target.files[0])
                        setImage(e.target.files[0])
                        
                    }
                    break;
                
            }
    
        }

    const onDrop = useCallback((files:File[])=>{
            console.log('aaa',files)
            setImage(files[0])
            
    
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
                        id='image'
                        name='image'
                        type="file"
                        className='hidden'
                        accept="image/*"
                        onChange={handleFileChange}
                        
                        />
                        <label htmlFor="image" 
                        
                        className='cursor-pointer'>
                            
                            <div className={` rounded-md ${!image && 'border-2 border-dashed' } h-[160px] w-full
                            border-gray-600 hover:border-gray-500 bg-dashboard-600 text-gray-400 hover:bg-dashboard-500 transition-all
                            flex flex-col items-center justify-center`}>
                                
                            {image ? 
                                    (
                                        <>
                                        <img src={URL.createObjectURL(image)} className='h-full w-full rounded-md' alt="" />
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

export default InputFileProduct