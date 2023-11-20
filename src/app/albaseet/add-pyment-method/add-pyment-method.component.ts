import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { customer } from '../models/customers';
import { payment_method } from '../models/payment_method';
import { TranslateService } from '@ngx-translate/core';
import { parseWebAPIErrors } from 'src/app/uitiles/utils';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-pyment-method',
  templateUrl: './add-pyment-method.component.html',
  styleUrls: ['./add-pyment-method.component.css']
})
export class AddPymentMethodComponent {
  isloading: boolean;
  storedata: any;
  paymont: any;
  custmer_name: any;
  customer_ename: any;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private services: MyservcesService,
    private router: Router,private notifyService : NotificationService,
    private activeRoute: ActivatedRoute,private translateService : TranslateService
  ) { }
  baseId! : string
  customerForm!: FormGroup;;
  message: string;
  id: any;
  img: File;
  btnTitle: string;
  isAddMode!: boolean;
  title: string;
  IsEditMode: boolean;
  urlIamge: string;
  payment: payment_method;
  customer: customer[];
  isbusy: boolean;
  //editdoctorData: EditDoctorModel;
  //doctorData: DoctorModel;
  errors: string[] = [];


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
    this.isLoading = false
    this.custmer_name = ''
    this.customer_ename = ''
    this.isloading = false
    this.title = 'اضافة طريقه دفع جديده';
    this.btnTitle = 'اضافة';
    this.id = 0;
    // this.img = '' as unknown as File
    this.customer = [];
    this.message = '';
    this.urlIamge = 'assets/images/Add.png';
    this.payment = {
      customer_id:'',
      customer_aname: '',
      customer_ename: '',
      id: ''
    }


    this.customerForm = this.fb.group({
      customer_aname: ['', Validators.required],
      customer_ename: ['', Validators.required],


    });
    this.baseId = this.activeRoute.snapshot.params['id'];
    this.isAddMode = !this.baseId;
    this.GetAllPayment1()

    this.activeRoute.paramMap.subscribe(param => {
      var id = Number(param.get('id'));

      if (id) {
        this.services.GetAllpaymentbyid(id).subscribe((customer: any) => {
          this.storedata = customer.data
          this.paymont = this.storedata.filter((x: any) => x.customer_id === id)
      
          this.title = 'تعديل  طريقة دفع';
          this.btnTitle = 'تعديل وحفظ';
          this.IsEditMode = true;
          this.id = id;
          for (var item of this.paymont) {
            this.custmer_name = item.customer_aname
            this.customer_ename = item.customer_ename

          }
          this.customerForm.patchValue({
            customer_aname: this.custmer_name,
            customer_ename: this.customer_ename
          })


        })
      }


      else {
        console.log("not found")
      }
    })
  }
  getTitle(){
    return this.isAddMode ? this.translateService.instant('titleSave') : this.translateService.instant('titleEdit');
  }
  getSaveButton(){
    return this.isAddMode ? this.translateService.instant('button.save') : this.translateService.instant('button.edit');
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
    this.isloading = true
    if (this.customerForm.valid) {
      
      if (this.id > 0) {
        this.payment.customer_id=this.id
        this.payment.customer_aname = this.customerForm.value.customer_aname;
        this.payment.customer_ename = this.customerForm.value.customer_ename;

        this.services.EditPaymont(this.payment).subscribe((doctor: any) => {
          
          this.message = doctor.message.ar
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: true, timer: 2000, title: 'Success!', text: 'تمت عملية التعديل بنجاح',
            icon: 'success',
          });
      
          this.isLoading = false;
          this.router.navigate(['paymontlsit']);
        }, (ex: any) => {
          this.errors = parseWebAPIErrors(ex);
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 2000, title: 'info!', text: 'لم تتم عملية التعديل  بنجاح',
            icon: 'info',
          });
          this.isLoading = false;
        })
      }
      else {
        this.ValidateModel()
        this.services.AddpaymentMethod(this.payment).subscribe((doctor: any) => {
          this.notifyService.showSuccess(doctor.message.ar);
        
          this.router.navigate(['paymontlsit']);
        }, (ex1: any) => {
          this.errors = parseWebAPIErrors(ex1);
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 3000, title: 'info!', text: 'لم تتم العملية بنجاح',
            icon: 'info',
          });

        })
      }


    }
  }



  GoToList() {
    sessionStorage.setItem('customer', 'customer');
    this.router.navigate(['Dashborad']);
  }
  GetAllPayment1() {
    this.services['GetAllpayment']().subscribe((list: any) => {
      this.customer = list.data;
      this.customer = this.customer.filter((x: any) => x.customer_aname !== null)
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



  ValidateModel() {

    this.payment.customer_aname = this.customerForm.value.customer_aname;
    this.payment.customer_ename = this.customerForm.value.customer_ename;



  }


}

