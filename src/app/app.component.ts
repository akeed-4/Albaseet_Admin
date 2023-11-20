import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleModule, BnNgIdleService } from 'bn-ng-idle';
import { ConnectionService } from 'ng-connection-service';
import Swal from 'sweetalert2';
import { PreloaderService } from './preloader.service';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentLanguage: string;
  isConnected: boolean;
  form:FormGroup
  textDir:string
  dropDownFilter:any
  language:string
  countriesFiltered:string
  citiesFiltered:any
  status = '';
  statesFiltered:any
  noInternetConnection: boolean;
  constructor(private connectionService: ConnectionService, @Inject(DOCUMENT) private Document: Document, private route: Router, private preloader: PreloaderService,
    private bndle: BnNgIdleService,  private spinnerService: NgxSpinnerService,) {
      this.currentLanguage=localStorage.getItem('currentLanguage')
    this.bndle.startWatching(600).subscribe((istimeout: Boolean) => {
      if (istimeout) {
        const token = localStorage.getItem('token')
        if (token) {
          this.route.navigate(['login']);
          localStorage.removeItem("token")
          this.bndle.stopTimer()
          this.ngOnInit()
          Swal.fire({
            toast: true, position: 'center',
            showConfirmButton: true, title: 'عذرا', text: ' انتهت الجلسة',
            icon: 'warning',
          });
        }
      }
    })
  }
  ngOnInit() {
    this.changeDirection()
    this.spinnerService.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinnerService.hide();
    }, 3000);
    this.preloader.hide();
    this.isConnected = navigator.onLine ? true : false
    this.connectionService.monitor().subscribe((isConnected) => {
      isConnected = isConnected;
      if (isConnected.hasInternetAccess && isConnected.hasNetworkConnection) {
        this.noInternetConnection = false;
      
      }
      else {
        this.noInternetConnection = true;
        this.status='No Internet '
        Swal.fire({
          toast: true, position: 'center',
          showConfirmButton: true, title: 'عذرا', text: this.status,
          icon: 'warning',
        });
       
      }
    
    })

  }

  changeDirection() {
    const htmlTag = this.Document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    htmlTag.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';

  }
}
