import { T } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginService } from 'angular-auth-oidc-client/lib/login/login.service';


import * as $ from 'jquery';
import { Login } from 'src/app/albaseet/models/login';
import { AuthoService } from 'src/app/autho.service';

import { MyservcesService } from 'src/app/myservces.service';
import { loginAouthservice } from 'src/app/services/loginAouth.service';
import { NotificationService } from 'src/app/services/notification.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin: FormGroup;
  hidePassword: boolean = true;
  showLoading: boolean = false;
  showroom: any;
  temp: any;
  isloading: boolean;
  constructor(private fb: FormBuilder,private notifyService : NotificationService,
    private loginservice:loginAouthservice,
    private route: Router, private service: AuthoService, private auth: AuthoService, private services: MyservcesService,) {
   
  }
  hide: boolean = true;
  reg!: Login;
  loginForm!: FormGroup
  ngOnInit() {

    this.isloading = false
    this.loginForm = this.fb.group({
      user_name: ['', Validators.required],
      password: ['', Validators.required],

    });
    this.reg = {
      user_name: '',
      password: '',

    }
  }
  ValidateModel() {
    this.reg.user_name = this.loginForm.value.user_name;
    this.reg.password = this.loginForm.value.password;


  }
  regist() {
    this.route.navigate(["registar"])
  }


  submit1() {
    this.isloading = true
    const usern = this.loginForm.get('user_name').value
    const pass = this.loginForm.get('password').value
    if (usern == null || usern == '') {
      this.notifyService.showError(' يرجى ادخال   اسم المستخدم ');
      this.isloading = false
    }
    else if (pass == null || pass == '') {
      this.notifyService.showError(' يرجى ادخال  كلمه المرور ');
     
      this.isloading = false
    }
    this.ValidateModel()
    if (pass && usern) {
      this.loginservice.Proceddlogin(this.reg).subscribe((succes: any) => {
        if (succes.data.access_token) {
          localStorage.setItem('userName', this.loginForm.value.user_name);
          localStorage.setItem('token', succes.data.access_token);
          this.route.navigate(['dashboard']);

        }
        else {
          this.isloading = false
          this.notifyService.showError(" اسم المستخدم او كلمة السر غير صحيحة ");
          // Swal.fire({
          //   toast: true, position: 'center',
          //   showConfirmButton: true, title: 'info!', text: '  اسم المستخدم او كلمة السر غير صحيحة ',
          //   icon: 'error',
          // });
      
        }
      },
        err => {
          console.log(err.error);
        });

    }
  }
}

