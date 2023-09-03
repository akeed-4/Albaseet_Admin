import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { nameModel } from '../models/namemodel';
import { products } from '../models/products';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  productForm: FormGroup
  message: string;
  btnTitle: string;
  title: string;
  id: number;
  img: File;
  isloading: boolean
  storedata: any
  productsMod: products;
  IsEditMode: boolean;
  product: products[];
  urlIamge: string;
  isbusy: boolean;
  products: products;
  productstorage: any
  product_name: string
  messageValidate = {
    productsnameAr: {
      required: ' اسم الصنف مطلوب!',
      matchproductName: 'الاسم  موجود',
    },

    productsnameEn: {
      required: ' اسم الصنف مطلوب!',
    },


    price: {
      required: 'السعر  مطلوب..!',
    },
    Images: {
      required: 'الرجاء ملئ الحقل ..!',
    }
  };

  ngOnInit(): void {
    this.GetAllproducts()
    this.title = 'اضافة صنف جديد';
    this.btnTitle = 'اضافة';
    this.message = '';
    this.id = 0;
    this.isloading = false
    this.img = null;
    this.product = [];
    this.urlIamge = '/assets/imges/logo.png';
    this.storedata;
    this.productstorage;
    this.product_name = ''
    this.productForm = this.fb.group({
      productsnameAr: ['', Validators.required],
      productsnameEn: ['', Validators.required],
      price: ['',   [Validators.required]],

      Images: [null]
    });
    this.products = {
      new_item: 0,
      product_ename: '',
      available_quantity: 0,
      product_id: '',
      product_aname: '',
      productsnameAr: '',
      productsnameEn: 'strin',
      product_image: '',
      quantity: 0,

      price: 0,
      description: ''

    }
    this.activeRoute.paramMap.subscribe(param => {
      const id = Number(param.get('id'));
      console.log(id);
      if (id) {
        this.service.Getproduct(id).subscribe((productsMod: any) => {
          this.storedata = productsMod.data;
          this.productstorage = this.storedata.filter((x: any) => x.product_id === id)
          console.log(this.productstorage)
          this.title = 'تعديل بيانات صنف';
          this.btnTitle = 'تعديل وحفظ';
          this.IsEditMode = true;
          this.id = id;
          for (var item of this.productstorage) {
            this.product_name = item.product_aname
            console.log(this.product_name)
          }
          this.productForm.setValue({
            productsnameAr: this.product_name,
            productsnameEn: productsMod.productsnameEn,
            price: productsMod.price,
            Images: productsMod.product_image,
          })

        })
      }

    })
   
  }
 
  Addproduct() {
    if (this.productForm.valid) {
      this.isloading = true
      this.ValidateModel();
      this.service.AddproductMod(this.products).subscribe((product: any) => {

        this.ngOnInit();
        this.message = product.message.ar;

        Swal.fire({ toast: true, position: 'center',
        showConfirmButton: false, timer: 3000, title: 'Success!', text: 'تمت عملية الاضافه بنجاح',
         icon: 'success', });

        this.isloading = false
        console.log(product)
      }, ex => {
        console.log(ex);
        this.message = '';
        this.isloading = false
        Swal.fire({ toast: true, position: 'center',
        showConfirmButton: false, timer: 3000, title: 'info!', text: 'لم تتم الاضافه بنجاح',
         icon: 'info', });

      })
    }
  }

  GoToList() {
    // sessionStorage.setItem('product', 'product');
    const lang1 = localStorage.getItem("lang");
    if(lang1=='Ar'){
    this.router.navigate(['Dashborad']);}
    else{
      this.router.navigate(['Dashborad2']);
    }
  }
  GetAllproducts() {
    this.service.GetAllproduct().subscribe((list: any) => {
      this.product = list.data;
    }, ex => console.log(ex));
    this.isloading = false
  }

  // دالة التعامل مع الصوره
  HandleFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];

      const reader = new FileReader();

      reader.onload = function (e) {
        const csv = reader.result;
        $('#image').attr('src', e.target.result.toString());
      }
      reader.readAsDataURL(this.img);
    } else {
      this.img == null;
      $('#image').attr('src', '/assets/imges/logo.png');
    }

  }
  ValidateModel() {

    this.products.product_aname = this.productForm.value.productsnameAr;
    this.products.product_ename = this.productForm.value.productsnameEn;

    this.products.price = this.productForm.value.price;
    this.products.product_image = this.productForm.value.Images;
    this.products.new_item = 0;

  }
  isproductsNameExist() {
    var name = this.productForm.value.productsnameAr;
    if (name !== null && name !== '') {
      for (const user of this.product.values()) {
        if (user.product_aname === name) {
          return true;
        }

      }
    }
    return false;
  }

}

