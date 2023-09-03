import { CommonModule, NgFor } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexGrid,
  NgApexchartsModule
} from "ng-apexcharts";
import { Catgores, Catgory } from "src/app/albaseet/models/catgory";
import { DemoMaterialModule } from "src/app/demo-material-module";
import { MyservcesService } from "src/app/myservces.service";
import { MenuItems } from "src/app/shared/menu-items/menu-items";

export interface ChartOptions {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  dataLabels: ApexDataLabels | any;
  plotOptions: ApexPlotOptions | any;
  yaxis: ApexYAxis | any;
  xaxis: ApexXAxis | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
  stroke: ApexStroke | any;
  legend: ApexLegend | any;
  grid: ApexGrid | any;
}

@Component({
  selector: "app-sales-overview",
  standalone: true,
  imports: [ DemoMaterialModule,NgFor,TranslateModule],
  templateUrl: "./sales-overview.component.html"
})
export class SalesOverviewComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public chartOptions: Partial<ChartOptions>;
  num3: number;
  products: any;
  currentLanguage: string;
  customers: any;
  num1: number;
  recipte: any;
  num2: number;
  price2: any;
  storedata: any;
  num: number;
  price1: any;

  constructor(private servicess: MyservcesService,private router:Router) {
    this.currentLanguage=localStorage.getItem('currentLanguage')
  }

  ngOnInit(): void {
    this.num3=0
    this.num1=0
    this.num2 =0
    this.num=0
this.Getproducts()
this.getrecipte()
this.getInvice()
this.GetAllcustmer()
    
   }
   Getproducts() {
    this.servicess.GetAllproduct().subscribe((list: any) => {

      this.products = list.data;
      for (var pr of this.products) {
        this.num3 += 1

      }
  
    }, ex => {
      console.log(ex.error);

    });
  }
  GetAllcustmer() {
    this.servicess.GetAllcustmers().subscribe((list: any) => {
      this.customers = list.data;

      for (var pr of this.customers) {
        this.num1 += 1

      }
     
    }, (ex: any) => {
      console.log(ex);

    });
  }
  listcustomer(){
    this.router.navigate(['listcustomer'])
  }
  listproduct(){
    this.router.navigate(['listproduct'])
  }
  reportinvioce(){
    this.router.navigate(['reportinvioce'])
  }
  listReicept(){
    this.router.navigate(['listReicept'])
  }
  getrecipte() {
    this.servicess.GetAllrecipte().subscribe((list: any) => {
      this.recipte = list.data;
      for (var pr of this.recipte) {
        this.num2 += 1
        this.price2+=pr.receipt_amount
      }
      
    }, (ex: any) => {
      console.log(ex);
    });
  }
  getInvice() {
    this.servicess.GetAllInices().subscribe((list: any) => {

      this.storedata = list.data;


      for (var pr of this.storedata) {
        this.num += 1
        this.price1+=pr.total_amount
      }


   

    }, (ex: any) => {
      console.log(ex);
    });
  }
}
