import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService,private translateService: TranslateService) {}

  showSuccess(message: string,title?: string) {
    if(title == null){
      title = this.translateService.instant('notification.successTitle')
    }
    this.toastr.success(message, title, {
      positionClass: this.translateService.currentLang == 'ar' ? this.translateService.currentLang == 'ar' ? 'toast-bottom-right' : 'toast-bottom-left' : 'toast-bottom-left',
      closeButton: true,
    });
  }

  showError(message: string,title?: string) {
    if(title == null){
      title = this.translateService.instant('notification.errorTitle')
    }
    this.toastr.error(message, title, {
      positionClass: this.translateService.currentLang == 'ar' ? 'toast-bottom-right' : 'toast-bottom-left',
      closeButton: true,
      timeOut: 8000
    });
  }

  showInfo(message: string,title?: string) {
    this.toastr.info(message, title, {
      positionClass: this.translateService.currentLang == 'ar' ? 'toast-bottom-right' : 'toast-bottom-left',
      closeButton: true,
    });
  }

  showWarning(message: string,title?: string) {
    if(title == null){
      title = this.translateService.instant('notification.warningTitle')
    }
    this.toastr.warning(message, title, {
      positionClass: this.translateService.currentLang == 'ar' ? 'toast-bottom-right' : 'toast-bottom-left',
      closeButton: true,
    });
  }

  public confirmAlert(title: string, text?: string) {
    return Swal.fire({
      title: title || this.translateService.instant('notification.confirmTitle'),
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant('notification.yes'),
      cancelButtonText: this.translateService.instant('notification.cancel'),
      allowOutsideClick: false,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
    });
  }

  public confirmAlertWithInput(title: string, text?: string) {
    return Swal.fire({
      title: title ||this.translateService.instant('notification.confirmTitle'),
      text: text,
      input: 'text',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: this.translateService.instant('notification.yes'),
      cancelButtonText: this.translateService.instant('notification.cancel'),
      allowOutsideClick: false,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
  });
  }

  public warningAlert(title: string, text?: string) {
    return Swal.fire({
      title: title || this.translateService.instant('notification.warningTitle'),
      text: text,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: this.translateService.instant('notification.yes'),
      cancelButtonText: this.translateService.instant('notification.cancel'),
      allowOutsideClick: false
    });
  }

  public successAlert(title: string, text?: string) {
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: title || this.translateService.instant('notification.successTitle'),
      text : text || this.translateService.instant('notification.successText'),
      showConfirmButton: true,
      confirmButtonText: this.translateService.instant('notification.ok'),
    })
  }
}
