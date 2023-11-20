import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loading: boolean = false;

  constructor(private spinner: NgxSpinnerService) { }

  setLoading(loading: boolean) {
    this.spinner.show();
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
