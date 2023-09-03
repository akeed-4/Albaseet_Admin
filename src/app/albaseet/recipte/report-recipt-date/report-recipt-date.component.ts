import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { approveinvice } from '../../models/approveinvice';
import { recipte } from '../../models/recipte';
import { reportinv } from '../../models/report';

@Component({
  selector: 'app-report-recipt-date',
  templateUrl: './report-recipt-date.component.html',
  styleUrls: ['./report-recipt-date.component.css']
})
export class ReportReciptDateComponent {
  start: any;
  end: any;

  constructor(
    private router: Router,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute,private fb: FormBuilder

  ) { }
  report: reportinv;
  productForm: FormGroup
  selectedMembers:any[]
  aprove: approveinvice;
  storedata:any
  recipte: recipte [];
  //doctor: AddDoctorModel;
  num: number;
  message: string;
insail:Date
  ngOnInit(): void {
    const currentDate = new Date().toISOString().substring(0, 10);
    
    this.insail=new Date()
    this.start = new Date()
    this.end = new Date()
    this.storedata=[]
    this.report = {
      enddate: new Date(),
      startdate: new Date()

    }

    this.aprove = {
      id: 0
    }
    this.productForm = this.fb.group({
      startdate: ['2023-01-01', Validators.required],
      enddate: [currentDate, Validators.required],

    });
  this.selectedMembers=[]
    this.num = 0;
    this.recipte = [];
    this.message = '';
   
    this.getrecipte();
  }
 
  getrecipte() {
    this.servicess.GetAllrecipte().subscribe((list:any) => {
      this.storedata = list.data;

      this.recipte =  this.storedata.filter((x:any)=> x.receipt_acceptance===1 ) ;

    }, (ex: any) => {
      console.log(ex);
    });
  }

  change(){
 
    this.report.startdate=this.productForm.value.startdate;
    this.report.enddate=this.productForm.value.enddate;
    console.log(this.report.startdate)
   
    this.start = moment(this.report.startdate + 'T00:00')
    this.end = moment(this.report.enddate + 'T23:59')
    this.selectedMembers = this.recipte.filter(m => new Date(m.receipt_date) >  this.start && new Date(m.receipt_date) <  this.end);
  
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

  DeleteCount() {
    var cont = $(".ckitem:checked").length;
    this.num = cont;
  }




}



