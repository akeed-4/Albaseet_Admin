import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import * as IntlTelInput from 'intl-tel-input';
import { customer } from '../models/customers';

import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private services: MyservcesService,
    private router: Router,
    private activeRoute: ActivatedRoute, @Inject(DOCUMENT) document: Document
  ) { }

  customerForm: FormGroup;;
  message: any;
  id: number;
  img: File;
  contryes: any[]
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
  invoices_count: number
  isLoading: boolean
  customer_taxid: string
  //editdoctorData: EditDoctorModel;
  //doctorData: DoctorModel;
  storedata: any

//Phone number is required
  messageValidate = {
    customer_aname: {
      required: ' اسم العميل مطلوب!  ',
      matchUserName: 'الاسم  موجود',
    },
    customernameEn: {
      required: ' اسم العميل مطلوب!',
    },
    address: {
      required: ' الرجاء ادخال العنوان!',
    },
    country: {
      required: '  بلد العميل مطلوب..!',
    },
    Tax: {
      required: ' الرقم الضريبي مطلوب..!',
      maxlength: 'الحد الادني  للرقم الضريبي 6 مقاطع'
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
    
    this.customerForm = this.fb.group({
      customer_aname: ['', Validators.required],
      customernameEn: ['', Validators.required],
      address: ['', Validators.required],
      mobile: ['', [Validators.required]],
      country: ['', Validators.required],
      customer_taxid: ['', Validators.required],
      customer_city: [''],
      customer_state: [''],
      customer_postcode: [''],
    });
  
      const inputelemnets = document.getElementById("mobile");

      if (inputelemnets != null) {
        IntlTelInput(inputelemnets, {
          initialCountry: "SA",
          separateDialCode: true,

          utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
        })
      }


    this.contryes = [
      { "text": "Afghanistan", "value": "AF" },
      { "text": "Åland Islands", "value": "AX" },
      { "text": "Albania", "value": "AL" },
      { "text": "Algeria", "value": "DZ" },
      { "text": "American Samoa", "value": "AS" },
      { "text": "Andorra", "value": "AD" },
      { "text": "Angola", "value": "AO" },
      { "text": "Anguilla", "value": "AI" },
      { "text": "Antarctica", "value": "AQ" },
      { "text": "Antigua and Barbuda", "value": "AG" },
      { "text": "Argentina", "value": "AR" },
      { "text": "Armenia", "value": "AM" },
      { "text": "Aruba", "value": "AW" },
      { "text": "Australia", "value": "AU" },
      { "text": "Austria", "value": "AT" },
      { "text": "Azerbaijan", "value": "AZ" },
      { "text": "Bahamas", "value": "BS" },
      { "text": "Bahrain", "value": "BH" },
      { "text": "Bangladesh", "value": "BD" },
      { "text": "Barbados", "value": "BB" },
      { "text": "Belarus", "value": "BY" },
      { "text": "Belgium", "value": "BE" },
      { "text": "Belize", "value": "BZ" },
      { "text": "Benin", "value": "BJ" },
      { "text": "Bermuda", "value": "BM" },
      { "text": "Bhutan", "value": "BT" },
      { "text": "Bolivia", "value": "BO" },
      { "text": "Bosnia and Herzegovina", "value": "BA" },
      { "text": "Botswana", "value": "BW" },
      { "text": "Bouvet Island", "value": "BV" },
      { "text": "Brazil", "value": "BR" },
      { "text": "British Indian Ocean Territory", "value": "IO" },
      { "text": "Brunei Darussalam", "value": "BN" },
      { "text": "Bulgaria", "value": "BG" },
      { "text": "Burkina Faso", "value": "BF" },
      { "text": "Burundi", "value": "BI" },
      { "text": "Cambodia", "value": "KH" },
      { "text": "Cameroon", "value": "CM" },
      { "text": "Canada", "value": "CA" },
      { "text": "Cape Verde", "value": "CV" },
      { "text": "Cayman Islands", "value": "KY" },
      { "text": "Central African Republic", "value": "CF" },
      { "text": "Chad", "value": "TD" },
      { "text": "Chile", "value": "CL" },
      { "text": "China", "value": "CN" },
      { "text": "Christmas Island", "value": "CX" },
      { "text": "Cocos (Keeling) Islands", "value": "CC" },
      { "text": "Colombia", "value": "CO" },
      { "text": "Comoros", "value": "KM" },
      { "text": "Congo", "value": "CG" },
      { "text": "Congo, The Democratic Republic of the", "value": "CD" },
      { "text": "Cook Islands", "value": "CK" },
      { "text": "Costa Rica", "value": "CR" },
      { "text": "Cote D'Ivoire", "value": "CI" },
      { "text": "Croatia", "value": "HR" },
      { "text": "Cuba", "value": "CU" },
      { "text": "Cyprus", "value": "CY" },
      { "text": "Czech Republic", "value": "CZ" },
      { "text": "Denmark", "value": "DK" },
      { "text": "Djibouti", "value": "DJ" },
      { "text": "Dominica", "value": "DM" },
      { "text": "Dominican Republic", "value": "DO" },
      { "text": "Ecuador", "value": "EC" },
      { "text": "Egypt", "value": "EG" },
      { "text": "El Salvador", "value": "SV" },
      { "text": "Equatorial Guinea", "value": "GQ" },
      { "text": "Eritrea", "value": "ER" },
      { "text": "Estonia", "value": "EE" },
      { "text": "Ethiopia", "value": "ET" },
      { "text": "Falkland Islands (Malvinas)", "value": "FK" },
      { "text": "Faroe Islands", "value": "FO" },
      { "text": "Fiji", "value": "FJ" },
      { "text": "Finland", "value": "FI" },
      { "text": "France", "value": "FR" },
      { "text": "French Guiana", "value": "GF" },
      { "text": "French Polynesia", "value": "PF" },
      { "text": "French Southern Territories", "value": "TF" },
      { "text": "Gabon", "value": "GA" },
      { "text": "Gambia", "value": "GM" },
      { "text": "Georgia", "value": "GE" },
      { "text": "Germany", "value": "DE" },
      { "text": "Ghana", "value": "GH" },
      { "text": "Gibraltar", "value": "GI" },
      { "text": "Greece", "value": "GR" },
      { "text": "Greenland", "value": "GL" },
      { "text": "Grenada", "value": "GD" },
      { "text": "Guadeloupe", "value": "GP" },
      { "text": "Guam", "value": "GU" },
      { "text": "Guatemala", "value": "GT" },
      { "text": "Guernsey", "value": "GG" },
      { "text": "Guinea", "value": "GN" },
      { "text": "Guinea-Bissau", "value": "GW" },
      { "text": "Guyana", "value": "GY" },
      { "text": "Haiti", "value": "HT" },
      { "text": "Heard Island and Mcdonald Islands", "value": "HM" },
      { "text": "Holy See (Vatican City State)", "value": "VA" },
      { "text": "Honduras", "value": "HN" },
      { "text": "Hong Kong", "value": "HK" },
      { "text": "Hungary", "value": "HU" },
      { "text": "Iceland", "value": "IS" },
      { "text": "India", "value": "IN" },
      { "text": "Indonesia", "value": "ID" },
      { "text": "Iran, Islamic Republic Of", "value": "IR" },
      { "text": "Iraq", "value": "IQ" },
      { "text": "Ireland", "value": "IE" },
      { "text": "Isle of Man", "value": "IM" },
      { "text": "Israel", "value": "IL" },
      { "text": "Italy", "value": "IT" },
      { "text": "Jamaica", "value": "JM" },
      { "text": "Japan", "value": "JP" },
      { "text": "Jersey", "value": "JE" },
      { "text": "Jordan", "value": "JO" },
      { "text": "Kazakhstan", "value": "KZ" },
      { "text": "Kenya", "value": "KE" },
      { "text": "Kiribati", "value": "KI" },
      { "text": "Korea, Democratic People'S Republic of", "value": "KP" },
      { "text": "Korea, Republic of", "value": "KR" },
      { "text": "Kuwait", "value": "KW" },
      { "text": "Kyrgyzstan", "value": "KG" },
      { "text": "Lao People'S Democratic Republic", "value": "LA" },
      { "text": "Latvia", "value": "LV" },
      { "text": "Lebanon", "value": "LB" },
      { "text": "Lesotho", "value": "LS" },
      { "text": "Liberia", "value": "LR" },
      { "text": "Libyan Arab Jamahiriya", "value": "LY" },
      { "text": "Liechtenstein", "value": "LI" },
      { "text": "Lithuania", "value": "LT" },
      { "text": "Luxembourg", "value": "LU" },
      { "text": "Macao", "value": "MO" },
      { "text": "Macedonia, The Former Yugoslav Republic of", "value": "MK" },
      { "text": "Madagascar", "value": "MG" },
      { "text": "Malawi", "value": "MW" },
      { "text": "Malaysia", "value": "MY" },
      { "text": "Maldives", "value": "MV" },
      { "text": "Mali", "value": "ML" },
      { "text": "Malta", "value": "MT" },
      { "text": "Marshall Islands", "value": "MH" },
      { "text": "Martinique", "value": "MQ" },
      { "text": "Mauritania", "value": "MR" },
      { "text": "Mauritius", "value": "MU" },
      { "text": "Mayotte", "value": "YT" },
      { "text": "Mexico", "value": "MX" },
      { "text": "Micronesia, Federated States of", "value": "FM" },
      { "text": "Moldova, Republic of", "value": "MD" },
      { "text": "Monaco", "value": "MC" },
      { "text": "Mongolia", "value": "MN" },
      { "text": "Montserrat", "value": "MS" },
      { "text": "Morocco", "value": "MA" },
      { "text": "Mozambique", "value": "MZ" },
      { "text": "Myanmar", "value": "MM" },
      { "text": "Namibia", "value": "NA" },
      { "text": "Nauru", "value": "NR" },
      { "text": "Nepal", "value": "NP" },
      { "text": "Netherlands", "value": "NL" },
      { "text": "Netherlands Antilles", "value": "AN" },
      { "text": "New Caledonia", "value": "NC" },
      { "text": "New Zealand", "value": "NZ" },
      { "text": "Nicaragua", "value": "NI" },
      { "text": "Niger", "value": "NE" },
      { "text": "Nigeria", "value": "NG" },
      { "text": "Niue", "value": "NU" },
      { "text": "Norfolk Island", "value": "NF" },
      { "text": "Northern Mariana Islands", "value": "MP" },
      { "text": "Norway", "value": "NO" },
      { "text": "Oman", "value": "OM" },
      { "text": "Pakistan", "value": "PK" },
      { "text": "Palau", "value": "PW" },
      { "text": "Palestinian Territory, Occupied", "value": "PS" },
      { "text": "Panama", "value": "PA" },
      { "text": "Papua New Guinea", "value": "PG" },
      { "text": "Paraguay", "value": "PY" },
      { "text": "Peru", "value": "PE" },
      { "text": "Philippines", "value": "PH" },
      { "text": "Pitcairn", "value": "PN" },
      { "text": "Poland", "value": "PL" },
      { "text": "Portugal", "value": "PT" },
      { "text": "Puerto Rico", "value": "PR" },
      { "text": "Qatar", "value": "QA" },
      { "text": "Reunion", "value": "RE" },
      { "text": "Romania", "value": "RO" },
      { "text": "Russian Federation", "value": "RU" },
      { "text": "RWANDA", "value": "RW" },
      { "text": "Saint Helena", "value": "SH" },
      { "text": "Saint Kitts and Nevis", "value": "KN" },
      { "text": "Saint Lucia", "value": "LC" },
      { "text": "Saint Pierre and Miquelon", "value": "PM" },
      { "text": "Saint Vincent and the Grenadines", "value": "VC" },
      { "text": "Samoa", "value": "WS" },
      { "text": "San Marino", "value": "SM" },
      { "text": "Sao Tome and Principe", "value": "ST" },
      { "text": "Saudi Arabia", "value": "SA" },
      { "text": "Senegal", "value": "SN" },
      { "text": "Serbia and Montenegro", "value": "CS" },
      { "text": "Seychelles", "value": "SC" },
      { "text": "Sierra Leone", "value": "SL" },
      { "text": "Singapore", "value": "SG" },
      { "text": "Slovakia", "value": "SK" },
      { "text": "Slovenia", "value": "SI" },
      { "text": "Solomon Islands", "value": "SB" },
      { "text": "Somalia", "value": "SO" },
      { "text": "South Africa", "value": "ZA" },
      { "text": "South Georgia and the South Sandwich Islands", "value": "GS" },
      { "text": "Spain", "value": "ES" },
      { "text": "Sri Lanka", "value": "LK" },
      { "text": "Sudan", "value": "SD" },
      { "text": "Suriname", "value": "SR" },
      { "text": "Svalbard and Jan Mayen", "value": "SJ" },
      { "text": "Swaziland", "value": "SZ" },
      { "text": "Sweden", "value": "SE" },
      { "text": "Switzerland", "value": "CH" },
      { "text": "Syrian Arab Republic", "value": "SY" },
      { "text": "Taiwan, Province of China", "value": "TW" },
      { "text": "Tajikistan", "value": "TJ" },
      { "text": "Tanzania, United Republic of", "value": "TZ" },
      { "text": "Thailand", "value": "TH" },
      { "text": "Timor-Leste", "value": "TL" },
      { "text": "Togo", "value": "TG" },
      { "text": "Tokelau", "value": "TK" },
      { "text": "Tonga", "value": "TO" },
      { "text": "Trinidad and Tobago", "value": "TT" },
      { "text": "Tunisia", "value": "TN" },
      { "text": "Turkey", "value": "TR" },
      { "text": "Turkmenistan", "value": "TM" },
      { "text": "Turks and Caicos Islands", "value": "TC" },
      { "text": "Tuvalu", "value": "TV" },
      { "text": "Uganda", "value": "UG" },
      { "text": "Ukraine", "value": "UA" },
      { "text": "United Arab Emirates", "value": "AE" },
      { "text": "United Kingdom", "value": "GB" },
      { "text": "United States", "value": "US" },
      { "text": "United States Minor Outlying Islands", "value": "UM" },
      { "text": "Uruguay", "value": "UY" },
      { "text": "Uzbekistan", "value": "UZ" },
      { "text": "Vanuatu", "value": "VU" },
      { "text": "Venezuela", "value": "VE" },
      { "text": "Viet Nam", "value": "VN" },
      { "text": "Virgin Islands, British", "value": "VG" },
      { "text": "Virgin Islands, U.S.", "value": "VI" },
      { "text": "Wallis and Futuna", "value": "WF" },
      { "text": "Western Sahara", "value": "EH" },
      { "text": "Yemen", "value": "YE" },
      { "text": "Zambia", "value": "ZM" },
      { "text": "Zimbabwe", "value": "ZW" }
    ];

    // mobile

    this.GetAllcustmer()

    this.storedata;
    this.customer_taxid = ''
    this.isLoading = false
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

    this.title = 'اضافة عميل جديد';
    this.btnTitle = 'اضافة';
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

    

    this.activeRoute.paramMap.subscribe(param => {
      var id = Number(param.get('id'));
      if (id) {

        this.services.Getcustomer(id).subscribe((customer: any) => {
          this.storedata = customer.data;
          this.customer1 = this.storedata.filter((x: any) => x.customer_id === id)
          console.log(this.customer1);
          this.title = 'تعديل بيانات عميل';
          this.btnTitle = 'تعديل وحفظ';
          this.IsEditMode = true;
          this.id = id;
          for (var item of this.customer1) {
            this.custmer_name = item.customer_aname
            this.customer_address = item.customer_address
            this.customer_mobile = item.customer_mobile
            this.customer_country = item.customer_country
            this.customer_country = item.customer_country
            this.customer_ename = item.customer_ename
            this.customer_taxid = item.customer_taxid
            this.invoices_count = item.invoices_count
          }
        
          this.customerForm.patchValue({
            customer_aname: this.custmer_name,
            address: this.customer_address,
            mobile: this.customer_mobile,
            country: this.customer_country,
            customernameEn: this.customer_ename,
            customer_taxid: this.customer_taxid
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
      this.isLoading = true
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
        this.customers.customer_city = this.customerForm.value.customer_city;
        this.customers.customer_state = this.customerForm.value.customer_state;
        this.customers.customer_postcode = this.customerForm.value.customer_postcode;
        this.services.Editcustomer(this.customers ).subscribe((doctor: any) => {
          this.ngOnInit();
          this.message = doctor.message.ar
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 2000, title: 'Success!', text: 'تمت عملية التعديل بنجاح',
            icon: 'success',
          });
     
            this.isLoading = false;
         
        }, (ex: any) => {
          console.log(ex.error);
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 2000, title: 'info!', text: 'لم تتم عملية التعديل  بنجاح',
            icon: 'info',
          });
          
            this.isLoading = false;
         
        })

      } 
      else {
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
     
            this.isLoading = false;
  
        }, (ex: any) => {
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: false, timer: 3000, title: 'info!', text: 'لم تتم العملية بنجاح',
            icon: 'info',
          });
        
            this.isLoading = false;
          
        })
      }
    }
  }

  GoToList() {
    // sessionStorage.setItem('customer', 'customer');

    const lang1 = localStorage.getItem("lang");
    if (lang1 == 'Ar') {
      this.router.navigate(['Dashborad']);
    }
    else {
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
          if (user.customer_taxid === customer_taxid) {
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
          if (user.customer_mobile === mobile) {
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
    this.customers.customer_city = this.customerForm.value.customer_city;
    this.customers.customer_state = this.customerForm.value.customer_state;
    this.customers.customer_postcode = this.customerForm.value.customer_postcode;

  }


}

