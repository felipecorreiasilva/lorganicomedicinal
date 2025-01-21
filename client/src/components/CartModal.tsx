"use client"

import { IoIosCloseCircle } from "react-icons/io";
import { useProductsContext } from "../context/CartContext";
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useCartModalContext } from "../context/CartModalContext";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ProductsTypes } from "@/Types/ProductsTypes";
import axios from "axios";

const CartModal: React.FC = () => {
  const { products,setProducts,decrementAmount, removeFromCart,incrementAmount } = useProductsContext();
  const {cartModal,setCartModal}=useCartModalContext();
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false)
  const [fetchProducts, setFetchProducts] = useState<ProductsTypes|any>()
  
  const totalPrice = products.reduce((total, product) => total + (product.price * product.amountProduct), 0); // Multiplication du prix par la quantité

  const handleNewRequest = (e:any) => {
    e.preventDefault();
    setButtonLoading(true);
    router.push('/newRequest')
    setButtonLoading(false);
    setCartModal(false)
    
  }

  const handleOnChange = (e:any,product:ProductsTypes)=> {
        
        e.preventDefault()
        switch(e.target.name){
  
            case 'amountProduct':
              if (products != null){
                if (e.target.value == '' || parseInt(e.target.value) < 1) {
                  const newObj = [...products]
                  newObj.forEach(p => 
                    {if (p.id == product.id) p.amountProduct = 1}
                    );
                  setProducts(newObj)
                }else {
                //   const newObj = {...products,[e.target.name]:parseInt(e.target.value)}
                  const newObj = [...products]
                  newObj.forEach(p => 
                    {if (p.id == product.id) p.amountProduct = parseInt(e.target.value)}
                    );
                  setProducts(newObj)
  
                }
                
              }
              
              break
           
        }
     
    }

    useEffect(() => {
      const fetchData = async () => {
          const _url = 'http://localhost:3001/products'
          const result = await axios.get(_url)
          setFetchProducts(result.data)
      }
      fetchData();
    }, [])

  return (
    <>
      {cartModal && (
        <div className="w-[380px] h-[100vh] overflow-y-auto fixed right-0 bg-white border border-l-gray-700 pb-16">
          <button onClick={() => setCartModal(!cartModal)} className="text-gray-700 absolute top-2 right-2">
            <IoIosCloseCircle />
          </button>
          <div className="p-4">
            <h2 className="text-sm font-bold mb-4 text-gray-700">Carrinho de compras</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">Seu carrinho está vazio.</p>
            ) : (
              products.map((product,id:number) => (
                <div key={id} className="mt-2">
                  <Card className="rounded-none">
                    <CardContent className="">
                        
                        <div className="relative flex pt-[24px]">
                        <Image className="w-auto h-auto" src={product?.image} alt={product?.name} width={35} height={35}/>
                        <div className="pl-4">
                            <h3 className="mt-[4px] text-center text-xs text-gray-700 font-bold">{product?.name}</h3>
                            <p className="text-cyan-600 mt-6 text-xs flex flex-col">{product?.discount}% {product?.discountDesc}</p>
                        </div>
                        
                        
                        <button className="absolute w-8 h-[40px] cursor-pointer -right-[12px] top-4" onClick={() => removeFromCart(product?.id)}>
                            <RiDeleteBin6Line />
                        </button>

                        </div>

                        <div className="flex justify-between font-bold text-xs mt-4 ml-16 text-black">
                            <div className="flex items-center border py-[2px]">
                                <button onClick={()=>decrementAmount(product?.id)} className="pr-2">
                                <MdKeyboardArrowLeft className='' />
                                </button>
                                {(product?.amountProduct != undefined) && (
                                <input
                                id='amountProduct' 
                                name='amountProduct'
                                value={product?.amountProduct}
                                type="text"
                                onChange={e=>handleOnChange(e,product)}
                                className='w-8 text-center'
                                />
            
                                )}
                                
                                
                                {/* <span>{product?.amountProduct}</span> */}
                                <button onClick={()=>incrementAmount(product?.id)} className="pl-2">
                                <MdKeyboardArrowRight />
                                </button>
                                
                            </div>

                            <p className="">R${((product?.price)*product?.amountProduct).toFixed(2).replace('.',',')}</p>

                        </div>
                        
                    </CardContent>
                  </Card>
                  
                </div>
              ))
            )}
            <div className="mt-5 text-black font-bold flex items-center justify-between gap-2">
                <h5>Total:</h5>
                <div className="flex flex-col">
                    <p className="">{totalPrice.toFixed(2).replace('.',',')} R$</p>
                    <p className="text-[10px]">Ou até 6x de {(totalPrice/6).toFixed(2).replace('.',',')} R$</p>
                    
                </div>
                
            </div>
            <button className="w-full uppercase grid mt-5 self-end place-content-center bg-black hover:bg-opacity-95 text-white p-2" onClick={(e) => handleNewRequest(e)} >
              {!buttonLoading?'Iniciar compra' : <div className='w-[30px] h-[30px]'></div>}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;