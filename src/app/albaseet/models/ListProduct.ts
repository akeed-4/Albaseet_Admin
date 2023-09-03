export interface lsitproduct{
  product_id:string;
  product_aname: string;
  product_ename: string;
  price:string
}
export interface countryDropDownDto{
  product_id:string;
  product_aname?:string;

}
export class lsitproductDictionary {
  [key: string]: lsitproduct;
}

export class lsitproductLanguageData {
  public static lsitproductDictionary: lsitproductDictionary = {
    en: {
      product_id: 'product_id',
      product_aname: 'product_aname Arabic',
      product_ename: 'product_ename English',
      price:'price'
    },
    ar: {
      product_id: 'كود المنتج',
      product_aname: 'المنتج عربي ',
      product_ename: ' المنتج انجليزي',
      price:'السعر'
    }
  };
}


