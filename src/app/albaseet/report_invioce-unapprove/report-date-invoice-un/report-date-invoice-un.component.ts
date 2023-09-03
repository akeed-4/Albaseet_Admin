import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { MyservcesService } from 'src/app/myservces.service';
import { inivce } from '../../models/invice';
import { reportinv } from '../../models/report';

@Component({
  selector: 'app-report-date-invoice-un',
  templateUrl: './report-date-invoice-un.component.html',
  styleUrls: ['./report-date-invoice-un.component.css']
})
export class ReportDateInvoiceUnComponent {



  labledata: any[]
  price: any;
  realdata: any[]
  count: number;
  i: number;
  j: number
  count1: number
  maxDate: number
  storedata: any;
  productForm: FormGroup
  selectedMembers: inivce[]
  selectedMember: any[]
  invoice: any[];
  invoice_date: any;
  storage: any
  storageinvioce: any
  invoice1: inivce[];
  report: reportinv;
  start: any;
  end: any;
  constructor(private router: Router, private fb: FormBuilder,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute) { }
  ngOnInit(): void {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.start = new Date()
    this.end = new Date()
    this.i = 0;
    this.j = 0
    this.maxDate = 4
    this.storageinvioce = 0
    this.storage = 0
    this.selectedMember = [];
    this.price = 0
    this.selectedMembers = []
    this.count = 0;
    this.invoice_date = ''
    this.count1 = 0;
    this.labledata = []
    this.realdata = []
    this.storedata = '';
    this.invoice = [];
    this.report = {
      enddate: new Date(),
      startdate: new Date()
    }
    this.servicess.GetAllInices().subscribe((list: any) => {
      this.storedata = list.data;
      this.invoice =  this.storedata.filter((x:any)=> x.invoice_acceptance===0 )
      console.log(this.invoice)
      for (var pr of this.invoice) {
        this.price += pr.total_amount
      }
      //  this.renderchart(this.count, this.count1);
    }, (ex: any) => {
      console.log(ex);
    });
    this.productForm = this.fb.group({
      startdate: ['2023-01-01', [Validators.required, Validators.maxLength(4)]],
      enddate: [currentDate, [Validators.required, Validators.maxLength(4)]],
    });
  }
  SelectAll() {
  }
  change() {
this.price=0
    this.report.startdate = this.productForm.value.startdate;
    this.report.enddate = this.productForm.value.enddate;
    this.start = moment(this.report.startdate + 'T00:00')
    this.end = moment(this.report.enddate + 'T23:59')
    this.selectedMembers = this.invoice.filter(m => new Date(m.invoice_date)
      > new Date( this.start) && new Date(m.invoice_date) < new Date( this.end));
    this.count = 0;
    this.count1 = 0;
for(var item of this.selectedMembers){
  this.count+=item.total_amount
  this.count1+=item.paid_amount
}

    // for (let item = 0; item < this.selectedMembers.length; item++) {
    //   const dt = new Date(this.selectedMembers[item].invoice_date)
    //   const dt1 = new Date(this.selectedMembers[item + 1].invoice_date)
    //   if (dt.getFullYear() === dt1.getFullYear()) {
    //     if (this.j > 0) {
    //       this.count = 0;
    //       this.count1 = 0;
    //       this.count += this.selectedMembers[item].total_amount;
    //       this.count += this.selectedMembers[item + 1].total_amount;
    //       this.count1 += this.selectedMembers[item].paid_amount;
    //       this.count1 += this.selectedMembers[item + 1].paid_amount;
    //       if (this.i < 1) {
    //         this.selectedMember.push(this.selectedMembers[item]);
    //         this.i++
    //       }
    //     }
    //     else {
    //       this.count += this.selectedMembers[item].total_amount;
    //       this.count += this.selectedMembers[item + 1].total_amount;
    //       this.count1 += this.selectedMembers[item].paid_amount;
    //       this.count1 += this.selectedMembers[item + 1].paid_amount;
    //       if (this.i < 1) {
    //         this.selectedMember.push(this.selectedMembers[item]);
    //         this.i++
    //       }
    //     }
    //   }
    //   else {
    //     this.count = 0;
    //     this.count1 = 0;
    //     this.count += this.selectedMembers[item].total_amount;
    //     this.count += this.selectedMembers[item + 1].total_amount;
    //     this.count1 += this.selectedMembers[item].paid_amount;
    //     this.count1 += this.selectedMembers[item + 1].paid_amount;
    //     this.selectedMember.push(this.selectedMembers[item]);
    //     this.j++
    //   }
    // }
    console.log(this.count)
  }
  getdayyear() {

  }

  approveRecipte(id: number) {
  }
}

