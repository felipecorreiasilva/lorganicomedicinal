import { BoxProductsTypes } from "./BoxProductsTypes"

export type ProductsTypes = {
    id: number,
    name: string,
    desc: string,
    country: string,
    image: string,
    price: number,
    height: number,
    width: number, 
    _length: number,
    weight: number,
    discount: number,
    discountDesc: string,
    oldPrice: number,
    amountProduct: number,
    imageList: string,
    boxProducts: BoxProductsTypes[]
}