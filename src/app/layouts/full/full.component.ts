import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnDestroy,AfterViewInit, Inject, ViewChild, Directive} from '@angular/core';
import { Menu, MenuItems } from '../../shared/menu-items/menu-items';
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
  sidenav?: MatSidenav;
  isShowing = false;
  @Directive({selector: 'mat-sidenav[appMenu]'})
  headres:false
  styleMarginBody = "";
  private _mobileQueryListener: () => void;
  isExpanded=true;
  currentLanguage: string;
  menuRtlEnabled: any;
  menuI: Menu[];
  menuName: string;
 
  constructor(
    changeDetectorRef: ChangeDetectorRef,private breakpointObserver: BreakpointObserver,
    media: MediaMatcher,
    public menuItems: MenuItems,@Inject(DOCUMENT) private document: Document,private router :Router
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1650px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
    this.styleMarginBody = this.currentLanguage == 'en' ? 'margin-left: 10px;' : 'margin-right: 10px;';
  
 this.getUserMenu() 

}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.changeStyleMarginBody();
  
  }
  ngAfterViewInit() {
  
  }
  itemClick(data: any) {
    const item = data.itemData;
    if (item.menuUrl.length > 4) {
      this.router.navigate([item.menuUrl]);
    }
  }
  changeStyleMarginBody(){
    const htmlTag = this.document.getElementById('menu');
    htmlTag.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    this.menuName = this.currentLanguage == 'en' ? "nameNameEn" : "nameNameAr";
  }
  backdashboard(){
this.router.navigate(['dashboard'])
  }
  onToggleClick(){
    if(this.isExpanded){
      this.styleMarginBody = this.currentLanguage == 'en' ? 'margin-left: 100px;' : 'margin-right: 100px;';
    }else{
     this.styleMarginBody = this.currentLanguage == 'en' ? 'margin-left: 1px;' : 'margin-right: 1px;';
    }}
  toggleSidenav() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait,Breakpoints.Tablet,Breakpoints.Web]).subscribe((res) => {
      if (res.matches) {
        this.sidenav!.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav!.mode = 'side';
        this.sidenav.open();
      }
    });
   
  }

  
  getUserMenu() {
    this.menuI = this.menuItems.getMenuitem();

 }
}
