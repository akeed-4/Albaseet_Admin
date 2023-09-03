import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SalesOverviewComponent } from './dashboard-components/sales-overview/sales-overview.component';
import { OurVisiterComponent } from './dashboard-components/our-visiter/our-visiter.component';
import { ProfileComponent } from './dashboard-components/profile/profile.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ActivityTimelineComponent } from './dashboard-components/activity-timeline/activity-timeline.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [SalesOverviewComponent, OurVisiterComponent, ProfileComponent, ContactsComponent, ActivityTimelineComponent],
	templateUrl: './dashboard.component.html'
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
