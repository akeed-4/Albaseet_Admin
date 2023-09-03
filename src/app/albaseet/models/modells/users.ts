export class User {
 
  id!:string;
  userName!:string;
  normalizedUserName!:string;
  email!:string;
  normalizedEmaul!:string;
  emailConfirmed!:boolean;
  passwordHash!:string;
 
  securityStamp!:string;
  concurencytemp!:string;
  phoneNumber!:string;
  phoneNumberConfirm!:boolean;
  towFactorEnabled!:boolean;
  lockouEnd!:Date;
  lockoutEnabled!:boolean;
  accessFailededcount!:number;
 

}
