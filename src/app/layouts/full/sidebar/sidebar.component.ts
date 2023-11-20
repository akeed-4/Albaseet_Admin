import { ChangeDetectorRef, Component, Inject, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { CommonModule, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthoService } from 'src/app/autho.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports:[DemoMaterialModule, NgFor, NgIf, RouterModule, CommonModule, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  currentLanguage: string;
  menuName: string;
  name: any;
  styleTexts: string;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,private translate:TranslateService,
    public menuItems: MenuItems,private service: AuthoService,private route:Router
    ,private auth:AuthoService, @Inject(DOCUMENT) private document: Document,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.currentLanguage=localStorage.getItem('currentLanguage')
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }
  ngOnInit(){
    this.changeStyleMarginBody()
    this.styleTexts = this.currentLanguage == 'ar' ? 'text-align: right;' : 'text-align: left;';
  }
  
  stye(){
    this.styleTexts = this.currentLanguage == 'ar' ? 'text-align: right;' : 'text-align: left;';
  }
  changeStyleMarginBody(){
    const htmlTag = this.document.getElementById('menu');
    htmlTag.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    this.menuName = this.currentLanguage == 'en' ? "menuNameEn" : "menuNameAr";
  
  }

}
