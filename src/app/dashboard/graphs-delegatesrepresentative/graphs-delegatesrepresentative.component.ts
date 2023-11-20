import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Chart } from 'chart.js';
import { DevExtremeModule } from 'devextreme-angular';
import moment from 'moment';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { MyservcesService } from 'src/app/myservces.service';

@Component({
  selector: 'app-graphs-delegatesrepresentative',
  templateUrl: './graphs-delegatesrepresentative.component.html',
  styleUrls: ['./graphs-delegatesrepresentative.component.scss'],
  standalone: true,
  imports: [DemoMaterialModule, NgFor, TranslateModule, NgIf, ReactiveFormsModule, DevExtremeModule],

})
export class GraphsDelegatesrepresentativeComponent {
  arraystor: any[];
  currentLanguage: string;
  count: number;
  productForm: FormGroup
  count1: number;
  count3: number;
  count4: number;
  report: any;
  start: any
  end: any
  contact: any[]

  currentDate: Date
  labledata: any[];
  chart: Chart<"pie", any[], string>;
  stor: any[];
  constructor(private router: Router, private service: MyservcesService, private fb: FormBuilder,) {
    this.currentLanguage = localStorage.getItem('currentLanguage')
  }

  ngOnInit(): void {
    this.contact = [
      {
        id: "1",
        name: "today"
      },

      {
        id: "3",
        name: "week"
      },
      {
        id: "2",
        name: "mounth"
      },
      {
        id: "4",
        name: "year"
      },
    ]
    this.labledata = [{
      day: 'Monday',
      oranges: 3,
    }, {
      day: 'Tuesday',
      oranges: 2,
    }, {
      day: 'Wednesday',
      oranges: 3,
    }, {
      day: 'Thursday',
      oranges: 4,
    }, {
      day: 'Friday',
      oranges: 6,
    }, {
      day: 'Saturday',
      oranges: 11,
    }, {
      day: 'Sunday',
      oranges: 4,
    }];
    const currentDate = new Date().toISOString().substring(0, 10);
    this.productForm = this.fb.group({
      start_date: ['2023-01-01', [Validators.required, Validators.maxLength(4)]],
      end_date: [currentDate, [Validators.required, Validators.maxLength(4)]],
      contact: ['', [Validators.required, Validators.maxLength(4)]],
    });
    this.report = {
      enddate: new Date(),
      startdate: new Date()
    }
    this.arraystor = []
    this.count = 0;
    this.count1 = 0
    this.count3 = 0;
    this.count4 = 0
    this.cartmethod()

  }
  renderchart(id: number, id2: any, id3: any, id4: any) {

   this.chart= new Chart("paid", {
      type: "pie",
      data: {
        labels: [' فواتير بيع نقد', '   فواتير بيع اجل ', '   فواتير ترجيع نقدا ', '    ترجيع اجل '],
        datasets: [{
          label: '',
          data: [id, id2, id3, id4],
          borderColor: "rgba(50,192,192,1)",
          backgroundColor: [
            'green',
            '#0D98BA',
            'red',
            'purple',
          ],
          borderWidth: 5,
        }]
      },
      options: {

        scales: {
          y: {
            beginAtZero: true
          }
        },

      },
      
    
    });

  }
  testDate() {

    this.labledata = []
    this.report.startdate = this.productForm.value.start_date;
    this.report.enddate = this.productForm.value.end_date;
    this.start = moment(this.report.startdate)
    this.end = moment(this.report.enddate)

    this.labledata = this.arraystor.filter(m => new Date(m.invoice_date)
      > new Date(this.start) && new Date(m.invoice_date) < new Date(this.end));

    for (let i = 0; i < this.labledata.length; i++) {

      if (this.arraystor[i].invoice_type === "001") {
        this.count += 1
      }
      else if (this.arraystor[i].invoice_type === "002") {
        this.count1 += 1
      }

      else if (this.arraystor[i].invoice_type === "003") {
        this.count3 += 1

      }
      else if (this.arraystor[i].invoice_type === "004") {
        this.count4 += 1

      }

    }

    this.renderchart(23, 56, 78, 45);
  }
  cartmethod() {
    this.service.GetAllInices().subscribe((list: any) => {
      this.arraystor = list.data;

      for (let i = 0; i < this.arraystor.length; i++) {

        if (this.arraystor[i].invoice_type === "001") {
          this.count += 1
        }
        else if (this.arraystor[i].invoice_type === "002") {
          this.count1 += 1
        }

        else if (this.arraystor[i].invoice_type === "003") {
          this.count3 += 1

        }
        else if (this.arraystor[i].invoice_type === "004") {
          this.count4 += 1

        }



      }
      this.renderchart(23, 23, 43, 34);
    }, (ex: any) => {
      console.log(ex);
    });

  }

  sendValue(e: any) {
    this.count = 0;
    this.count1 = 0
    this.count3 = 0;
    this.count4 = 0
    if (e == 1) {
      const currentDate = new Date().toISOString().substring(0, 10);
      this.service.GetAllInices().subscribe((list: any) => {
        this.arraystor = list.data;
        this.arraystor = this.arraystor.filter(m => m.invoice_date == currentDate)
        for (let i = 0; i < this.arraystor.length; i++) {
          if (this.arraystor[i].invoice_type === "001") {
            this.count += 1
          }
          else if (this.arraystor[i].invoice_type === "002") {
            this.count1 += 1
          }
          else if (this.arraystor[i].invoice_type === "003") {
            this.count3 += 1
          }
          else if (this.arraystor[i].invoice_type === "004") {
            this.count4 += 1
          }

        }
       this.stor=[this.count, this.count1, this.count3, this.count4]
        this.chart.data.labels = [' فواتير بيع نقد', '   فواتير بيع اجل ', '   فواتير ترجيع نقدا ', '    ترجيع اجل '],
        this.chart.data.datasets[0].data = [this.count, this.count1, this.count3, this.count4];
        this.chart.update()
      }, (ex: any) => {
        console.log(ex);
      });
    }
   else if (e == 2) {
       const currentDate = new Date()
      this.service.GetAllInices().subscribe((list: any) => {
        this.arraystor = list.data;
        const currentDateMinus1Week = new Date(currentDate.setDate(currentDate.getDate() - 7));
        this.arraystor = this.arraystor.filter(m => (m.invoice_date < currentDateMinus1Week && m.invoice_date > currentDate.getTime() - 14 * 24 * 60 * 60 * 1000))
        for (let i = 0; i < this.arraystor.length; i++) {
          if (this.arraystor[i].invoice_type === "001") {
            this.count += 1
          }
          else if (this.arraystor[i].invoice_type === "002") {
            this.count1 += 1
          }
          else if (this.arraystor[i].invoice_type === "003") {
            this.count3 += 1
          }
          else if (this.arraystor[i].invoice_type === "004") {
            this.count4 += 1
          }

        }
       this.stor=[this.count, this.count1, this.count3, this.count4]
        this.chart.data.labels = [' فواتير بيع نقد', '   فواتير بيع اجل ', '   فواتير ترجيع نقدا ', '    ترجيع اجل '],
        this.chart.data.datasets[0].data = [this.count, this.count1, this.count3, this.count4];
        this.chart.update()
      }, (ex: any) => {
        console.log(ex);
      });
    }
    else if (e == 3) {
     
      const currentDate = new Date();
     
      this.service.GetAllInices().subscribe((list: any) => {
        this.arraystor = list.data;
        const previousMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const previousMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        this.arraystor = this.arraystor.filter(m => (m.invoice_date >= previousMonthStart && m.invoice_date < previousMonthEnd))
        console.log( this.arraystor)
        for (let i = 0; i < this.arraystor.length; i++) {
          if (this.arraystor[i].invoice_type === "001") {
            this.count += 1
          }
          else if (this.arraystor[i].invoice_type === "002") {
            this.count1 += 1
          }
          else if (this.arraystor[i].invoice_type === "003") {
            this.count3 += 1
          }
          else if (this.arraystor[i].invoice_type === "004") {
            this.count4 += 1
          }

        }
       this.stor=[this.count, this.count1, this.count3, this.count4]
        this.chart.data.labels = [' فواتير بيع نقد', '   فواتير بيع اجل ', '   فواتير ترجيع نقدا ', '    ترجيع اجل '],
        this.chart.data.datasets[0].data = [this.count, this.count1, this.count3, this.count4];
        this.chart.update()
      }, (ex: any) => {
        console.log(ex);
      });
    }
    else{
      var currentDate = new Date()
      this.service.GetAllInices().subscribe((list: any) => {
        this.arraystor = list.data;
      
        this.arraystor = this.arraystor.filter(m => (m.invoice_date <= currentDate.getFullYear()-1 + 'T00:00')&&(m.invoice_date >= currentDate.getFullYear()-2+ 'T00:00'))
        console.log(this.arraystor)
        for (let i = 0; i < this.arraystor.length; i++) {
          if (this.arraystor[i].invoice_type === "001") {
            this.count += 1
          }
          else if (this.arraystor[i].invoice_type === "002") {
            this.count1 += 1
          }
          else if (this.arraystor[i].invoice_type === "003") {
            this.count3 += 1
          }
          else if (this.arraystor[i].invoice_type === "004") {
            this.count4 += 1
          }

        }
       this.stor=[this.count, this.count1, this.count3, this.count4]
        this.chart.data.labels = [' فواتير بيع نقد', '   فواتير بيع اجل ', '   فواتير ترجيع نقدا ', '    ترجيع اجل '],
        this.chart.data.datasets[0].data = [this.count, this.count1, this.count3, this.count4];
        this.chart.update()
      }, (ex: any) => {
        console.log(ex);
      });
    }
  }
}

