import { CommonModule, NgFor } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
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
  stats:any
  messages:any
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
  bigChart = [];
  cards = [];
  pieChart = [];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  page: any;
  constructor(private servicess: MyservcesService,private router:Router,
   ) {
    this.currentLanguage=localStorage.getItem('currentLanguage')
  }
  ELEMENT_DATA: any[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  ];
  ngOnInit(): void {
    this.ELEMENT_DATA=[]
 
    this.page=1
    this.dataSource.paginator = this.paginator;
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
    this.servicess.GetAllproduct(this.page).subscribe((list: any) => {
      this.page++
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
    this.router.navigate(['CustomerList'])
  }
  listproduct(){
    this.router.navigate(['productlist'])
  }
  reportinvioce(){
    this.router.navigate(['InvoiceReport'])
  }
  listReicept(){
    this.router.navigate(['ReiceptReport'])
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
