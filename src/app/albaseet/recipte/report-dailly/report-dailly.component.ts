import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MyservcesService } from 'src/app/myservces.service';
import { approveinvice } from '../../models/approveinvice';
import { recipte } from '../../models/recipte';
import { reportinv } from '../../models/report';

@Component({
  selector: 'app-report-dailly',
  templateUrl: './report-dailly.component.html',
  styleUrls: ['./report-dailly.component.css']
})
export class ReportDaillyComponent {

  start: any;
  end: any;
  count: any;
  count1: any;

  constructor(
    private router: Router,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute,private fb: FormBuilder

  ) { }
  report: reportinv;
  selectedMember:any[]
  productForm: FormGroup
  selectedMembers:any[]
  aprove: approveinvice;
  storedata:any
  temp:any[]
  recipte: recipte [];
  labledata:any[]
  //doctor: AddDoctorModel;
  num: number;
  message: string;
  selectdata:any[]
  ngOnInit(): void {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.count=0
    this.count1=0
    this.selectdata=[]
    this.selectedMember=[]
    this.temp=[]
    this.labledata=[]
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
    this.labledata=[]
    this.report.startdate=this.productForm.value.startdate;
    this.report.enddate=this.productForm.value.enddate;
    
    this.start = moment(this.report.startdate + 'T00:00')
    this.end = moment(this.report.enddate + 'T23:59')
    this.selectedMembers = this.recipte.filter(m => new Date(m.receipt_date) >  this.start && new Date(m.receipt_date) <  this.end);
    this.count=0
    this.count1=0
    for (var item of this.selectedMembers) {
      this.count += item.total_amount
      this.count1 += item.paid_amount

    }

    for (let item of this.selectedMembers) {
      this.labledata.push({

        "totalamount": item.receipt_amount,
        "date": moment(item.receipt_date).format('MM/DD/YYYY')
      })
    }
    const groupBy = (array: any[], groups: any | any[], valueKey: any) => {
        const
          getKey = (o: { [x: string]: any; }) => groups.map((k: string | number) => o[k]).join('|'),
          getObject = (o: { [x: string]: any; }) => Object.fromEntries([...groups.map((k: string | number) => [k, o[k]]), [valueKey, 0]])
        groups = [].concat(groups);
        return Object.values(array.reduce((r: { [x: string]: any; }, o: { [x: string]: string | number; }) => {
          (r[getKey(o)] ??= getObject(o))[valueKey] += +o[valueKey];
     
          return r;
        }, {}));
      }
  
    
this.selectedMember=groupBy( this.labledata, 'date', 'totalamount')


    
  
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



