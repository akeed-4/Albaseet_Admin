import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { customer } from '../models/customers';

@Component({
  selector: 'app-customer-delelet',
  templateUrl: './customer-delelet.component.html',
  styleUrls: ['./customer-delelet.component.css']
})
export class CustomerDeleletComponent {


  constructor(
    private fb: FormBuilder,
    private services: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  customerForm!: FormGroup;;
  message: any;
  id: number;
  img: File;
  btnTitle: string;
  title: string;
  IsEditMode: boolean;
  urlIamge: string;
  customers: customer;
  customer: customer[];
  customer1: any
  isbusy: boolean;
  custmer_name: string;
  customer_address: string
  customer_mobile: string
  customer_country: string;
  customer_ename: string
  isloading: boolean
  customer_taxid:string
  //editdoctorData: EditDoctorModel;
  //doctorData: DoctorModel;
  storedata: any


  messageValidate = {
    customer_aname: {
      required: ' اسم العميل مطلوب!',
      matchUserName: 'الاسم  موجود',
    },
    customernameEn: {
      required: ' required username!',
    },
    address: {
      required: ' الرجاء ادخال العنوان!',
    },
    country: {
      required: '  بلد العميل مطلوب..!',
    },
    Tax: {
      required: ' الرقم الضريبي مطلوب..!',
      maxlength:'الحد الادني  للرقم الضريبي 6 مقاطع'
    },

    mobile: {
      required: 'رقم الهاتف مطلوب..!',
      matchUserName: 'الرقم  موجود',
    },
    customer_taxid: {
      required: '  الرقم الضريبي مطلوب!',
      matchUserName: 'الرقم الضريبي موجود',
    }
  };
  minNum = 5;
  maxNum = 10;
  ngOnInit(): void {
    // mobile
 
    this.GetAllcustmer()
    
    this.storedata;
    this.customer_taxid=''
    this.isloading = false
    this.custmer_name = ''
    this.customer_address = ''
    this.customer_mobile = ''
    this.customer_country = ''
    this.customer1 = {
      customer_id: 0,
      customer_aname: '',
      customernameRr: '',
      customernameEn: '',
      customer_address: '',
      customer_country: '',
      customer_city: '',
      customer_state: '',
      customer_postcode: '',
      customer_taxid: 0,
      invoices_count: 0,
      receipts_amount: 0,
      user_id: 0,

      customer_mobile: '',
    }
 
    this.title = 'حذف عميل ';
    this.btnTitle = 'حذف';
    this.id = 0;
    // this.img = '' as unknown as File
    this.customer = [];
    this.message = '';
    this.urlIamge = 'assets/images/Add.png';

    this.customers = {
      customer_id: 0,
      customer_aname: '',
      customernameRr: '',
      customer_ename: '',
      customer_address: '',
      customer_country: '',
      customer_city: '',
      customer_state: '',
      customer_postcode: '',
      customer_taxid: 0,
      invoices_count: 0,
      receipts_amount: 0,
      user_id: 0,

      customer_mobile: '',
    }

    this.customerForm = this.fb.group({
      customer_aname: ['', Validators.required],
      customernameEn: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required]],
      country: ['', Validators.required],
      customer_taxid: ['',Validators.required],
    });

    this.activeRoute.paramMap.subscribe(param => {
      var id = Number(param.get('id'));
      if (id) {
        this.services.Getcustomer(id).subscribe((customer: any) => {
          this.storedata = customer.data;
          this.customer1 = this.storedata.filter((x: any) => x.customer_id === id)
          console.log(this.customer1);
          this.title  = ' حذف بيانات عميل';
          this.btnTitle = ' حذف';
          this.IsEditMode = true;
          this.id = id;
          for (var item of this.customer1) {
            this.custmer_name = item.customer_aname
            this.customer_address = item.customer_address
            this.customer_mobile = item.customer_mobile
            this.customer_country = item.customer_country
            this.customer_country = item.customer_country
            this.customer_ename = item.customer_ename
            this.customer_taxid=item.customer_taxid
          }

          this.customerForm.patchValue({
            customer_aname: this.custmer_name,
            address: this.customer_address,
            mobile: this.customer_mobile,
            country: this.customer_country,
            customernameEn: this.customer_ename,
            customer_taxid:this.customer_taxid
          })
        })
      }
    })
  }

//   get num1() {
//     return this.customerForm.get('customer_taxid');
//  }
 

  Addcustmer() {

    if (this.customerForm.valid) {
      this.isloading = true
      const fd = new FormData();
      // الباراميتر الاول يمثل اسم المفتاح المرسل وقيمته قيمة الملف المتمثل في الصوره
      if (this.id > 0) {

        this.customers.customer_id = this.id;
        this.customers.customernameRr = this.customerForm.value.customer_aname;
        this.customers.customer_aname = this.customerForm.value.customer_aname;
        this.customers.customer_ename = this.customerForm.value.customernameEn;
        this.customers.customer_mobile = this.customerForm.value.mobile;
        this.customers.customer_address = this.customerForm.value.address;
        this.customers.customer_country = this.customerForm.value.country;
        this.customers.customer_taxid = this.customerForm.value.customer_taxid;

        this.services.Editcustomer(this.customers).subscribe((doctor: any) => {
          this.ngOnInit();
          this.message = doctor.message.ar
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 2000, title: 'Success!', text: 'تمت  بنجاح',
            icon: 'success',
          });
          this.isloading = false
        }, (ex: any) => {
          console.log(ex.error);
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 2000, title: 'info!', text: 'لم تتم  بنجاح',
            icon: 'info',
          });
          this.isloading = false
        })

      } else {
        this.ValidateModel();
        this.services.Addcustomermodel(this.customers).subscribe((doctor: any) => {
          sessionStorage.setItem("addcustomer", "true");

          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 2000, title: 'Success!', text: 'تمت بنجاح',
            icon: 'success',
          });

          this.ngOnInit();
          this.message = doctor.message.ar;
          // Swal.fire('تمت العملية!', '  تم اضافه بيانات العميل بنجاح', 'info')
          this.isloading = false
        }, (ex: any) => {
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 3000, title: 'info!', text: 'لم تتم العملية بنجاح',
            icon: 'info',
          });
          this.isloading = false
        })
      }
    }
  }
  DeleteConfirm() {
    this.isloading=true
    this.services.DeletAllcustomer(this.id).subscribe((s: any) => {
    
   Swal.fire({
    toast: true, position: 'center',
    showConfirmButton: false, timer: 2000, title: 'Success!', text: s.message.ar,
    icon: 'success',
  });
 
  this.services.GetAllcustmers().subscribe((list: any) => {
    this.customers = list;
   
  }) 

  sessionStorage.setItem('customer', 'customer');

  const lang1 = localStorage.getItem("lang");
  if(lang1=='Ar'){
  this.router.navigate(['Dashborad']);}
  else{
    this.router.navigate(['Dashborad2']);
  }
    },
     (ex: any) => console.log(ex));

}
  GoToList() {
    sessionStorage.setItem('customer', 'customer');
    
    const lang1 = localStorage.getItem("lang");
    if(lang1=='Ar'){
    this.router.navigate(['Dashborad']);}
    else{
      this.router.navigate(['Dashborad2']);
    }
  }

  GetAllcustmer() {
    this.services.GetAllcustmers().subscribe((list: any) => {
      this.customer = list.data;
  
    }, ex => console.log(ex));
  }

  HandleFiles(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      this.img = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        $('#image').attr('src');
      }
      reader.readAsDataURL(this.img);
    } else {
      this.img == null;
      $('#image').attr('src', 'assets/Images/Add.png');
    }
  }
  isUserNameExist() {

    if (this.id > 0) {
      return false
    } else {
      var name = this.customerForm.value.customer_aname;
      if (name !== null && name !== '') {
        for (const user of this.customer.values()) {
          if (user.customer_aname === name) {
            return true;
          }

        }
      }
      return false;
    }

  }
  isUserNational() {
  
    if (this.id > 0) {
      return false
    } else {
      var customer_taxid = this.customerForm.value.customer_taxid;
      if (customer_taxid !== null && customer_taxid !== '') {
        for (const user of this.customer.values()) {
          if (user.customer_taxid ===  customer_taxid) {
            console.log(true)
            return true;
          }

        }
      }
      return false;
    }


  }
  isUserphone() {
  
    if (this.id > 0) {
      return false
    } else {
      var mobile = this.customerForm.value.mobile;
      if (mobile !== null && mobile !== '') {
        for (const user of this.customer.values()) {
          if (user.customer_mobile ===  mobile) {
            console.log(true)
            return true;
          }

        }
      }
      return false;
    }


  }
  ValidateModel() {
    this.customers.customernameRr = this.customerForm.value.customer_aname;
    this.customers.customer_aname = this.customerForm.value.customer_aname;
    this.customers.customer_ename = this.customerForm.value.customernameEn;
    this.customers.customer_mobile = this.customerForm.value.mobile;
    this.customers.customer_address = this.customerForm.value.address;
    this.customers.customer_country = this.customerForm.value.country;
    this.customers.customer_taxid = this.customerForm.value.customer_taxid;

  }


}
