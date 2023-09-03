import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit, Inject, ViewChild} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { DOCUMENT } from '@angular/common';
import { Route, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: []
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  @ViewChild(MatSidenav, { static: true })
  sidenav: MatSidenav;

 
  headres:false
  styleMarginBody = "";
  private _mobileQueryListener: () => void;
  isExpanded: any;
  currentLanguage: string;
  menuRtlEnabled: any;

  constructor(
    changeDetectorRef: ChangeDetectorRef,private breakpointObserver: BreakpointObserver,
    media: MediaMatcher,
    public menuItems: MenuItems,@Inject(DOCUMENT) private document: Document,private router :Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
    this.styleMarginBody = this.currentLanguage == 'en' ? 'margin-left: 10px;' : 'margin-right: 10px;';
  this.setSideBar()
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.changeStyleMarginBody();
  
  }
  ngAfterViewInit() {
  
  }
  changeStyleMarginBody(){
    const htmlTag = this.document.getElementById('menu');
    htmlTag.dir = this.currentLanguage === 'ar' ? 'ltr' : 'ltr';
   
  }
  backdashboard(){
this.router.navigate(['dashboard'])
  }
  toggleSidenav() {
    this.breakpointObserver.observe(['(max-width: 390px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
   
  }

  setSideBar(){
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
