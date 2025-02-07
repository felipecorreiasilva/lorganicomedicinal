import { ProductsTypes } from "./ProductsTypes"

export type OrdersTypes = {
    id: number,
    adresses: string,
    cep: number,
    city: string,
    cityComplement: string,
    country: string,
    deliveryMethod: string,
    emailContact: string,
    firstname: string, 
    lastname: string,
    houseNumber: number,
    cpf: string,
    phone: string,
    neighborhood: string,
    paymentMethod: string,
    pixCopiaECola: string,
    txid: string,
    uf: string,
    products: ProductsTypes[],
    status: string,
    totalPrice: number,
    freteId: string,
    freteStatus: string,
    
}