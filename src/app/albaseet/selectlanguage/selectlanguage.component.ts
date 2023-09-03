import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from "@angular/common";
import { Router } from '@angular/router';
@Component({
  selector: 'app-selectlanguage',
  templateUrl: './selectlanguage.component.html',
  styleUrls: ['./selectlanguage.component.css']
})
export class SelectlanguageComponent {
constructor( public translate: TranslateService, @Inject(DOCUMENT) private document: Document,
private route: Router,){
  translate.addLangs(['ar', 'en']);
  translate.setDefaultLang('ar');

}
switchLang(lang: string) {
   
  localStorage.setItem('lang',lang)

  this.translate.use(lang);
  this.route.navigate(['login']);
}
}
