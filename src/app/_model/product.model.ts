import { FileHandle } from "./file-handler.model";

export interface Product{
    productId:number,
    productName:string,
    productDesc: string,
    productDiscountedPrice: number,
    productActualPrice: number,
    productImages:FileHandle[],
    productManufacturer:string,
    productCategory:string,
    productBrand:string
}