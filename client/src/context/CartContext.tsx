"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { ProductsTypes } from '@/Types/ProductsTypes'
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

interface ProductsContextType {
    products: ProductsTypes[];
    setProducts: (value:ProductsTypes[])=> void;
    addToCart: (product: ProductsTypes) => void;
    decrementAmount: (productId: number) => void;
    incrementAmount: (productId: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

interface ProductsProviderProps {
    children: ReactNode;
}

const getInitialProducts = () => {
    const products = (typeof window !== 'undefined') && sessionStorage.getItem('products')
    return products ? JSON.parse(products) : []
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const ProductsProvider : React.FC<ProductsProviderProps> = ({children}) => {
    const [products, setProducts] = useState<ProductsTypes[]>(getInitialProducts);
    // const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        sessionStorage.setItem('products', JSON.stringify(products))
    }, [products]);

    useEffect(() => {
        const fetchData = async () => {
            const _url = 'http://localhost:3001/products'
            const result = await axios.get(_url)
            const newCartProducts = products.map((product:any)=>{
                const newObj:ProductsTypes = {
                    
                    id: product.id,
                    name: result.data[product.id-1].name,
                    desc: result.data[product.id-1].desc,
                    country: result.data[product.id-1].country,
                    image: result.data[product.id-1].image,
                    price: result.data[product.id-1].price,
                    height: result.data[product.id-1].height,
                    width: result.data[product.id-1].width,
                    _length: result.data[product.id-1]._length,
                    weight: result.data[product.id-1].weight,
                    discount: result.data[product.id-1].discount,
                    discountDesc: result.data[product.id-1].discountDesc,
                    oldPrice: result.data[product.id-1].oldPrice,
                    amountProduct: product.amountProduct,

                }
                
                return newObj

            })
            setProducts(newCartProducts)
        }
        fetchData();
      }, [pathname])

    const addToCart = (product: ProductsTypes) => {
        console.log('product ',product)
        // p.id == (product.id)
        const existingProductIndex = products.findIndex((p) => p.id == (product.id));
        if (existingProductIndex !== -1) {
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex].amountProduct += product.amountProduct;
            setProducts(updatedProducts)
        }
        else {
            // Le produit n'existe pas dans le panier, nous l'ajoutons avec une quantité de 1
            setProducts([...products, { ...product, amountProduct: product.amountProduct }]);
          }
    }

    const decrementAmount = (productId: number) => {

        const updatedProducts = products.map(product => {
            
            if (product.id === productId){
                if( product.amountProduct > 1 ){
                    return { ...product, amountProduct: product.amountProduct - 1 }
                } else {
                    return null
                }
            }
            return product;

        }).filter(product => product !== null) as ProductsTypes[];
        setProducts(updatedProducts);

    }

    const incrementAmount = (productId: number) => {
        setProducts(prevProducts => prevProducts.map(product => product.id === productId ? {...product, amountProduct: product.amountProduct + 1} : product))
    }

    const removeFromCart = (productId: number)=> {
        setProducts(products.filter(product => product.id !== productId))
    }

    const clearCart = () => {
        setProducts([]); // set the cart items to an empty array
      };

    return (
        <ProductsContext.Provider value={{products,setProducts, addToCart, removeFromCart, decrementAmount, incrementAmount, clearCart}} >{children}</ProductsContext.Provider>
    )

}

export const useProductsContext = () => {
    
    const context = useContext(ProductsContext)
    
    if (!context) {
        throw new Error('Error')
    }

    return context;
}