import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { MyservcesService } from 'src/app/myservces.service';
import Swal from 'sweetalert2';
import { inivce } from '../../models/invice';
import { reportinv } from '../../models/report';
import * as moment from 'moment';


@Component({
  selector: 'app-report-invioce-date',
  templateUrl: './report-invioce-date.component.html',
  styleUrls: ['./report-invioce-date.component.css']
})
export class ReportInvioceDateComponent {
temp:any[];
  dataTEST: any[]
  labledata: any[]
  price: any;
  start: any;
  end: any
  storprice: any[]
  realdata: any[]
  count: number;
  i: number;
  j: number
  data: any
  count1: number
  storeing: any[]
  maxDate: number
  storedata: any;
  selectdata:any[]
  productForm: FormGroup
  selectedMembers: inivce[]
  selectedMember: any[]
  invoice: any[];
  invoice_date: any;
  storage: any
  sum1: any;
  sum2: any;
  storageinvioce: any
  invoice1: inivce[];
  report: reportinv;
  prices: any;
  constructor(private router: Router, private fb: FormBuilder,
    private servicess: MyservcesService,
    private activeRoute: ActivatedRoute) { }
  ngOnInit(): void {
    const currentDate = new Date().toISOString().substring(0, 10);
    this.selectdata=[]
    this.temp=[];
    this.sum1 = 0;
    this.sum2 = 0
    this.start = new Date()
    this.end = new Date()
    this.storprice = []
    this.storeing = []
    this.data = []
    this.prices = 0
    this.dataTEST = []
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
      this.invoice = this.storedata;
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
    this.labledata = []
    this.report.startdate = this.productForm.value.startdate;
    this.report.enddate = this.productForm.value.enddate;
    this.start = moment(this.report.startdate + 'T00:00')
    this.end = moment(this.report.enddate + 'T23:59')

    this.selectedMembers = this.invoice.filter(m => new Date(m.invoice_date)
      > new Date(this.start) && new Date(m.invoice_date) < new Date(this.end));
    this.count = 0;
    this.count1 = 0;
    for (var item of this.selectedMembers) {
      this.count += item.total_amount
      this.count1 += item.paid_amount
    }
    for (let item of this.selectedMembers) {
      this.labledata.push({

        "paid": item.paid_amount,
        "totalamount": item.total_amount,
        "date": moment(item.invoice_date).format('MM/DD/YYYY')
      })
    }
    //دالة لحساب الاجمالي
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
    this.temp=   groupBy( this.labledata, 'date', 'paid');
this.selectedMember=groupBy( this.labledata, 'date', 'totalamount')
const conct=  this.selectedMember.concat( this.temp)
//دمج المصفوفتين علي شكل صف واحد
    const groupArrayByDate = (arr: any[]) => [...new Set(arr.map((e: { date: any; }) => e.date))].
    map(date => ({ date: date, items: Object.fromEntries(arr.
      filter((e: { date: unknown; }) => e.date === date).
      flatMap((e: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.entries(e).
      filter(f => f[0] !== 'date')).map((e: any[], i: number) => [`item${i + 1}`, e[1]])) }));

     let grouped = groupArrayByDate(conct);
     this.selectdata=grouped
    for (let item = 0; item < this.labledata.length; item++) {
      if (this.labledata[item]?.date === this.labledata[item + 1]?.date) {

        this.prices += this.labledata[item].totalamount
      }
    }
  }
  removeDups(_labledat: any) {
    const data = _labledat.find(function (_labledat: {
      name: string
      dateinvioce: String
    }): string | undefined {
      if (_labledat.name == "عقيد") {
        return _labledat.name
      }
      return null
    });
    this.storeing = _labledat.reduce((a: any, b: any) => {
      if (!_labledat.find((data: any) => data.invoice_date == b.invoice_date)) {
        _labledat.push(b)
      }
      return _labledat
    })
  }
  approveRecipte(_id: number) {
  }
}



