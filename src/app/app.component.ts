import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleModule, BnNgIdleService } from 'bn-ng-idle';
import { ConnectionService } from 'ng-connection-service';
import Swal from 'sweetalert2';
import { PreloaderService } from './preloader.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isConnected: boolean;
  status = '';
  noInternetConnection: boolean;
  constructor(private connectionService: ConnectionService, @Inject(DOCUMENT) private domDocument: Document, private route: Router, private preloader: PreloaderService,
    private bndle: BnNgIdleService) {
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
            showConfirmButton: true, title: 'عذرا', text: '    انتهت الجلسة',
            icon: 'warning',
          });
        }
      }

    })
  }
  ngOnInit() {
    this.isConnected = navigator.onLine ? true : false
    this.connectionService.monitor().subscribe((isConnected) => {
      isConnected = isConnected;
      if (isConnected.hasInternetAccess && isConnected.hasNetworkConnection) {
        this.noInternetConnection = false;
      
      }
      else {
        this.noInternetConnection = true;
        this.status='No Internet '
        alert(this.status)
      }
    
    })

  }


}
