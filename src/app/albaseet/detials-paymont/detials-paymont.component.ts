import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { MyservcesService } from 'src/app/myservces.service';
import { post } from '../models/post';

import { products } from '../models/products';




@Component({
  selector: 'app-detials-paymont',
  templateUrl: './detials-paymont.component.html',
  styleUrls: ['./detials-paymont.component.css']
})
export class DetialsPaymontComponent implements OnInit {

  constructor(
    private service: MyservcesService,private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  productForm:FormGroup;
  products: products[];
  post1:post[];
  post2:post;
  //hospital: AddHospitalModel;
  num: number;
  btnTitle: string;
  message: string;
  //id: number;
  title:any;
  img: File;
  messageValidate ={
    title: {
      required:' اسم الصنف مطلوب!',
    },
   
 
    body: {
      required:'السعر  مطلوب..!',
    },

  };
  ngOnInit(): void {

    this.productForm=this.fb.group({
      title: ['', Validators.required],
     
      body:['', Validators.required],
    
     
    });
this.post2={
  id:0,
  userId:0,
 body:'',
 title:''
}
this.title = 'اضافة صنف جديد';
this.btnTitle = 'اضافة';
    this.title=''
    this.num = 0;
    this.getpost();
    this.products = [];
    this.message = '';
  this.post1=[];
  this.img = '' as unknown as File;
  
   

  }

  Addproduct(){
    if (this.productForm.valid) {
      
      this.ValidateModel();
      this.service.updateppost(this.post2).subscribe(hospital => {
        this.ngOnInit();
        console.log("succes");
        this.message = 'تمت تعديل بيانات الصنف بنجاح';
      }, ex => {
        console.log(ex);
        this.message = '';
      })
    }

    // this.router.navigate(['login']).then(x => {window.location.reload()});
  }

  // GetHospitals() {
  //   this.service.GetAllproduct().subscribe((list) => {
  //     this.products = list;
  //   }, ex => {
  //     console.log(ex);
  //   });
  // }

  EditHospital(id: number) {

      this.router.navigate(['Addproduct', id]);


  }

  sertch(){
    if(this.title==''){this.ngOnInit() }
    else{
      this.post1=this.post1.filter(re=>{
        return re.title.toLocaleLowerCase().match(this.title.toLocaleLowerCase());
      })
    }

  }
  getpost(){
    this.service.Getpost().subscribe((list) => {
      this.post1 = list;
    }, ex => {
      console.log(ex);
    });
  }
  
  IsDelete() {
    var checkboxes = document.getElementsByClassName('ckitem');
    if (checkboxes.length > 0) {
      for (let i = 0; i < checkboxes.length; i++) {
        if ($(checkboxes[i]).is(":checked")) {
          return true;
        }
      }
    }
    return false;
  }

  // DeleteConfirms(id: string) {
  //   if (id)
  //   {
  //     this.service.Deletepost(id).subscribe(x => {
  //       this.post1 = x;
  //       $("#btnClose").trigger("click");
  //     }, ex => console.log(ex));

  //   }
  // }

  DeleteConfirm() {
    var checkboxes = document.getElementsByClassName("ckitem");
    if (checkboxes.length > 0) {
      var ids = [];
      for (let i = 0; i < checkboxes.length; i++) {
         if ($(checkboxes[i]).is(":checked")) {
            var id = String( $(checkboxes[i]).val());
            ids.push(id);
         }
      }
      this.service.Deletepost(ids).subscribe(x => {
      
 console.log("تمت عمليه الحذف بنجاح");

        $("#btnClose").trigger("click");
      }, ex => console.log(ex));
    }

  }




  DeleteCount() {
    var count = $(".ckitem:checked").length;
    this.num = count;
  }
  ValidateModel() {
    this.post2.body = this.productForm.value.body;
    this.post2.title = this.productForm.value.title;
    
  }
}




