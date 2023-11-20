import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { nameModel } from '../models/namemodel';
import { products } from '../models/products';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  page: any;

  constructor(private notifyService : NotificationService,
    private fb: FormBuilder,
    private service: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  productForm: FormGroup
  message: string;
  storedata: any[]
  btnTitle: string;
  isloading: boolean
  title: string;
  id: string;
  img: File;
  productsMod: products;
  IsEditMode: boolean;
  product: products[];
  urlIamge: string;
  isbusy: boolean;
  products: products;

  messageValidate = {
    productsnameAr: {
      required: ' اسم الصنف مطلوب!',
    },

    productsnameEn: {
      required: 'required product name ',
    },


    price: {
      required: 'السعر  مطلوب..!',
    },
    Images: {
      required: 'الرجاء ملئ الحقل ..!',
    }
  };
  product_aname: string;

  product_ename: string
  price: number;
  productImage:any
  customer_ename: string
  ngOnInit(): void {
    this.page=1
    this.product_aname = '',
      this.product_ename = '',
      this.price = 0
      this.productImage=[]
    this.storedata = []
    this.isloading = false
    this.title = 'تعديل بيانات صنف';
    this.btnTitle = 'تعديل وحفظ';
    this.message = '';
    this.id = '';
    this.img = null;
    this.product = [];
    this.urlIamge = '/assets/imges/logo.png';


    this.productForm = this.fb.group({
      productsnameAr: ['', Validators.required],
      productsnameEn: ['', Validators.required],
      price: ['', Validators.required],

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
      const id = String(param.get('id'));
      console.log(id);
      if (id) {
        this.service.GetAllproduct(this.page).subscribe((customer: any) => {
          this.page++
          this.storedata = customer.data;
          this.product = this.storedata.filter((x: any) => x.product_id === id)
          console.log(this.product);
          this.title = 'تعديل بيانات صنف';
          this.btnTitle = 'تعديل وحفظ';
          this.IsEditMode = true;
          this.id = id;
          for (var item of this.product) {
            this.product_aname = item.product_aname
            this.product_ename = item.product_ename
            this.price = item.price
            this.productImage=item.product_image

          }

          this.productForm.patchValue({
            productsnameAr: this.product_aname,
            productsnameEn: this.product_ename,
            price: this.price,

          })
        })
      }
    })

  }

  Addproduct() {
    this.activeRoute.paramMap.subscribe(param => {
      const id = String(param.get('id'));
      console.log(id);

      this.id = id;
    })
    if (this.productForm.valid) {
      this.isloading = true
      this.products.product_id = this.id;
      this.products.product_aname = this.productForm.value.productsnameAr;
      this.products.product_ename = this.productForm.value.productsnameEn;

      this.products.price = this.productForm.value.price;
      this.products.product_image = this.productForm.value.Images;
   

      if (this.id != null) {

        this.service.Editproduct(this.products).subscribe((product:any) => {
          // Swal.fire({
          //   toast: true, position: 'center',
          //   showConfirmButton: false, timer: 3000, title: 'Success!', text: 'تم التعديل بنجاح',
          //   icon: 'success',
          // });
          this.notifyService.showSuccess(product.message.ar);
          this.isloading = false
          // this.GoToList();
        }, ex => {
          console.log(ex);
          this.message = '';
          this.notifyService.showError(ex);
          this.isloading = false
        })
      }
    }
  }
  GoToList() {
    sessionStorage.setItem('product', 'product');
    this.router.navigate(['Dashborad']);
  }

  GetAllproducts() {

    this.service.GetAllproduct(this.page).subscribe((list: any) => {
      this.page++
      this.product = list.data;
      console.log(this.product)
    }, ex => console.log(ex));
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
}



