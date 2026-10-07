import { Product } from "./Product"

export interface User{
    _id: string
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    number: string,
    country: string,
    city: string,
    address: string,
    ZIP: string,
    cart: string[],
}