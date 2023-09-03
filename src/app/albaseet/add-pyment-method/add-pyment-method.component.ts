import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { customer } from '../models/customers';
import { payment_method } from '../models/payment_method';

@Component({
  selector: 'app-add-pyment-method',
  templateUrl: './add-pyment-method.component.html',
  styleUrls: ['./add-pyment-method.component.css']
})
export class AddPymentMethodComponent {
  isloading: boolean;

  constructor(
    private fb: FormBuilder,
    private services: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  customerForm!: FormGroup;;
  message: string;
  id: number;
  img: File;
  btnTitle: string;
  title: string;
  IsEditMode: boolean;
  urlIamge: string;
  payment: payment_method;
  customer: customer[];
  isbusy: boolean;
  //editdoctorData: EditDoctorModel;
  //doctorData: DoctorModel;



  messageValidate = {
    customer_aname: {
      required: ' اسم العميل مطلوب!',
      matchUserName: 'الاسم  موجود',
    },
    payment_en: {
      required: ' required username!',
    },

  };

  ngOnInit(): void {
    this.isloading =false
    this.title = 'اضافة طريقه دفع جديده';
    this.btnTitle = 'اضافة';
    this.id = 0;
    // this.img = '' as unknown as File
    this.customer = [];
    this.message = '';
    this.urlIamge = 'assets/images/Add.png';

this.payment={
 
  customer_aname:'',
 customer_ename:''
}

    this.customerForm = this.fb.group({
      customer_aname: ['', Validators.required],
      customer_ename: ['', Validators.required],
    
   
    });
this.GetAllPayment1()

    this.activeRoute.paramMap.subscribe(param => {
      var id = Number(param.get('id'));
      if (id) {
        this.services.Getcustomer(id).subscribe(customer => {
          console.log(customer);
          this.title = 'تعديل بيانات عميل';
          this.btnTitle = 'تعديل وحفظ';
          this.IsEditMode = true;
          this.id = id;
          this.customerForm.patchValue({
            customernameRr: customer.customer_aname,
            customernameEn: customer.customer_aname,
          


          })
        })
      }
    })
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

  Add_payment() {

    if (this.customerForm.valid) {
      this.isloading = true
      
       this.ValidateModel();
        this.services.AddpaymentMethod(this.payment).subscribe((doctor: any) => {
          sessionStorage.setItem("addcustomer","true");
        
           this.ngOnInit();
           Swal.fire({ toast: true, position: 'center',
        showConfirmButton: false, timer: 3000, title: 'Success!', text: 'تمت العملية بنجاح',
         icon: 'success', });


        }, (ex: any) => {
          Swal.fire({ toast: true, position: 'center',
          showConfirmButton: false, timer: 3000, title: 'info!', text: 'لم تتم العملية بنجاح',
           icon: 'info', });
          
        })

      }
    }

  

  GoToList() {
    sessionStorage.setItem('customer', 'customer');
    this.router.navigate(['Dashborad']);
  }
  GetAllPayment1() {
    this.services['GetAllpayment']().subscribe((list:any) => {
      this.customer = list.data;
      this.customer  =     this.customer.filter((x: any) => x.customer_aname !== null)
    //   this.customers.sort(function(a, b) {
    //     return a.customer_aname.localeCompare(b.customer_aname);
    //  });

     
    }, (ex: any) => {
      console.log(ex);
   
    });
  }
  // GetAllcustmer() {
  //   this.services.GetAllcustmers().subscribe((list) => {
  //     this.customer = list;
  //   }, ex => console.log(ex));
  // }

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

  ValidateModel() {
    this.payment.customer_aname = this.customerForm.value.customer_aname;
    this.payment.customer_ename = this.customerForm.value.customer_ename;
   
   
   
  }


}

