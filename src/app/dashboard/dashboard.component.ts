import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SalesOverviewComponent } from './dashboard-components/sales-overview/sales-overview.component';
import { OurVisiterComponent } from './dashboard-components/our-visiter/our-visiter.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ActivityTimelineComponent } from './dashboard-components/activity-timeline/activity-timeline.component';
import { CardComponent } from './dashboard-components/card/card.component';
import { ReportDaillyComponent } from './dashboard-components/report-dailly/report-dailly.component';
import { ReportChartComponent } from './dashboard-components/report-chart/report-chart.component';
import { DemoMaterialModule } from '../demo-material-module';
import { GraphsDelegatesrepresentativeComponent } from './graphs-delegatesrepresentative/graphs-delegatesrepresentative.component';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    imports: [SalesOverviewComponent, OurVisiterComponent, ProfileComponent, DemoMaterialModule, ContactsComponent, ActivityTimelineComponent, CardComponent, ReportDaillyComponent, ReportChartComponent, GraphsDelegatesrepresentativeComponent]
})
export class DashboardComponent implements OnInit {
	ngOnInit(): void {
	
	}
	checkproduct1(){

	}
	checkinvioce(){

	}
	checkcustomer(){

	}
	checkrecipt1(){

	}
	num2:any
	num:any
	price2:any
	price1:any
	num3:any
	num1:any
	

}
