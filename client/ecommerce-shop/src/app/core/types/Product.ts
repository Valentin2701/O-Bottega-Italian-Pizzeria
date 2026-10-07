export interface Product{
    _id: string,
    name: string,
    image: string,
    code: string,
    brand: string,
    price: number,
    description: string,
    owner: string,
    boughtBy?: Array<string>
}