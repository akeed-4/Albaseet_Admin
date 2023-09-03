import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthoService } from 'src/app/autho.service';

import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { Login } from '../models/login';




@Component({
  selector: 'app-creat-account-tabbi',
  templateUrl: './creat-account-tabbi.component.html',
  styleUrls: ['./creat-account-tabbi.component.css']
})
export class CreatAccountTabbiComponent implements OnInit {
  // prviet

  constructor(private fb: FormBuilder,
    private service: MyservcesService,
    private route: Router,
    private auth: AuthoService
  ) { }

  userForm!: FormGroup;
  userForm1!: FormGroup;
  userFormHosptal!: FormGroup;

  reg!: Login;

  regex!: RegExp;
  isbusy!: boolean;
  message!: string;
  showReDoctor!: boolean;
  showReUser!: boolean;
  showHos!: boolean;
  sRoleName!: string;

  messageValidate = {
    user_name: {
      required: ' اسم المستخدم  مطلوب!',
    },
    password: {
      required: ' كلمة المرور مطلوبة!',
    },
  };


  ngOnInit() {


    this.sRoleName = "User"
    this.showReDoctor = false;
    this.showReUser = true;
    this.isbusy = false;
    this.message = '';


    this.reg = {
      user_name: '',
      password: ''
    }


    this.userForm = this.fb.group({
      user_name: ['', Validators.required],

      password: ['', Validators.required],


    });


    this.userForm.valueChanges.subscribe(
      x => {
        if (this.userForm.status == 'VALID') {
          this.isbusy = true;
        }
      },
      ex => console.log(ex)
    );


  }



  register() {

    if (this.userForm.valid) {
      this.ValidateModel();
      this.auth.UserLogin(this.reg).subscribe( (succes:any) => {
        localStorage.setItem('token',succes.data.access_token);
        if(succes.data.access_token){
          const token = localStorage.getItem('token');
          console.log(  token);
         
          this.route.navigate(['Dashborad']);
        }
        else{
          
          Swal.fire('خطاء!', 'المستخدم غير موجود', 'info')
          
        }
     
    
          // this.message =
          //   'تم الدخول الى حسابك بنجاح,,,الرجاء التحقق من رسالة التحقق المرسله الى بريدك هذا'
          // this.userForm.value.password = '';
          // this.route.navigate(['Dashborad']).then(x => {window.location.reload()});
        },
        err => {
          console.log(err);


        });
  }
}
  ValidateModel() {
    this.reg.user_name = this.userForm.value.user_name;
    this.reg.password = this.userForm.value.password;

  }








  // isUserNameExist() {
  //   const name = this.userForm.value.userName;
  //   if (name != null && name != '' && this.isbusy === false ) {
  //     this.service.UserNameExist(name).subscribe(
  //       (x) => {
  //         // console.log('name exits');

  //         this.messageValidate.userName.matchUserName =
  //           'عذرا... اسم المستخدم هذا تم استخدامه ';
  //       },
  //       (ex) => console.log(ex)
  //     );

  //     return true;
  //   }else {
  //     this.messageValidate.userName.matchUserName== null;
  //     // ='';

  //   }
  //   return false;
  // }

  // isEmailExist() {
  //   const email = this.userForm.value.email;
  //   if (email != null && email != '' && this.isbusy === false) {
  //     this.service.UserEmailExist(email).subscribe(
  //       (x) => {
  //         // console.log('email exits');

  //         this.messageValidate.email.matchEmail =
  //           ' عذرا ...البريد الالكتروني هذا تم استخدامه  ';
  //       },
  //       (ex) => console.log(ex)
  //     );

  //     return true;
  //   }else {
  //     this.messageValidate.email.matchEmail== null;
  //           // ='';


  //   }
  //   return false;
  // }  roleId!: string;

  // onRolesChange(){

  //   this.service1.GetAllRoles().subscribe(s => {
  //     this.roles = s;
  //     this.roles.splice(1,1);
  //   },err=>console.log(err)
  //   );

  // }

  AddUserData() {
    this.userForm.setValue({
      roleName: this.userForm.value.roleName
    })
  }






  showUser(): boolean {
    this.showReDoctor = false;
    this.showHos = false;
    this.sRoleName = "User"
    return this.showReUser = true;
  }







  valdtateData() {
    if (this.userForm.value.userName == '' && this.userForm.value.email == '' && this.userForm.value.password == '' &&
      this.userForm.value.passwordConfirm == '') {
      return false;
    }
    return true;
  }
}
function errorAlertBox() {
  throw new Error('Function not implemented.');
}

