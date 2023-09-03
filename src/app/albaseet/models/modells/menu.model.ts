export class menuDto {
  menuId!:number;
  // menuCode!:number;
  menuNameAr?: string;
  menuNameEn?: string;
  // mainMenuId?: number | null;
  // show! : boolean;
  // applicationId! : number;
  // icon? : string;
  // isFavorite? : boolean;
  // menuOrder? : number;
   menuUrl! : string;
  // isMain! : boolean;
  // hasApprove! : boolean;
  items?: menuDto[] | null;
}


