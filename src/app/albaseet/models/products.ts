import { nameModel } from "./namemodel";
import { productdata } from "./productdata";

export class products{
  static findIndex(arg0: (p: any) => boolean) {
    throw new Error('Method not implemented.');
  }
  static push(arg0: { name: any; totalQuantitySold: any; }) {
    throw new Error('Method not implemented.');
  }
  static sort(arg0: (a: any, b: any) => number) {
    throw new Error('Method not implemented.');
  }
  static slice(arg0: number, arg1: number): any[] {
    throw new Error('Method not implemented.');
  }
  product_id:string;
 
    productsnameAr:string;
    productsnameEn:string;
    product_aname:string
    product_image:string;
    quantity:number;
    product_ename:string;
    new_item:Number;
    available_quantity:number
    price:number;
    description:string
 
  }
  