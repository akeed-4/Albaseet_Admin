import { T } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';


import * as $ from 'jquery';
import { Login } from 'src/app/albaseet/models/login';
import { AuthoService } from 'src/app/autho.service';

import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showroom: any;
  temp: any;
  isloading: boolean;
  constructor(private fb: FormBuilder,
    private route: Router, private service: AuthoService, private auth: AuthoService, private services: MyservcesService,) {

  }
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
      Swal.fire({
        toast: true, position: 'center',
        showConfirmButton: true, timer: 3000, title: 'info!', text: ' يرجى ادخال اسم المستخدم ',
        icon: 'info',
      });
      this.isloading = false
    }
    else if (pass == null || pass == '') {
      Swal.fire({
        toast: true, position: 'center',
        showConfirmButton: true, timer: 3000, title: 'info!', text: ' يرجى ادخال  كلمه المرور ',
        icon: 'info',
      });
      this.isloading = false
    }

    this.ValidateModel()

    if (pass && usern) {


      this.auth.UserLogin(this.reg).subscribe((succes: any) => {


        if (succes.data.access_token) {
          localStorage.setItem('userName', this.loginForm.value.user_name);
          localStorage.setItem('token', succes.data.access_token);
          this.route.navigate(['dashboard']);

        }
        else {
          this.isloading = false
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: true, title: 'info!', text: '  اسم المستخدم او كلمة السر غير صحيحة ',
            icon: 'error',
          });

        }
      },
        err => {
          console.log(err.error);
        });

    }
  }
}

