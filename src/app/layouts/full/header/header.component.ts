import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthoService } from 'src/app/autho.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  ischeck: string;
  styleMarginBody = "";
  currentLanguage! : string ;
  menuRtlEnabled= false;
  menuName='';
  UserName:any
  isExpanded: any;
constructor( public translateService: TranslateService,private service: AuthoService,private route:Router,private languageService:LanguageService, @Inject(DOCUMENT) private document: Document,){
  this.currentLanguage = this.languageService.getCurrentLanguage();
  
}
userName:any
ngOnInit(){
  this.UserName= localStorage.getItem("userName")
   this.translateService.use(this.currentLanguage);
   this.changeDirection();
   this.changeMenuSettings();
   this.changeStyleMarginBody();
  
}
 
  onChangeLanguage(language: string) {
    this.changeLocalLanguage(language);
    this.changeDirection();
 
  
  }
  changeMenuSettings(){
    this.menuRtlEnabled = this.currentLanguage == 'en' ? false : true;
  
  }
  loginuser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }
    return false;
  }
  isUserRegistered() {
    const token = localStorage.getItem('token');

    if (token ) {
      return true;
    }
    return false;
  }
  changeLocalLanguage(language: string){
   this.languageService.changeLocalLanguage(language);
    this.currentLanguage = language;
    parent.document.location.reload();
  }

  
  changeDirection() {
    
    const htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    htmlTag.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
    htmlTag.lang = this.currentLanguage;
  }
  
  changeStyleMarginBody(){
    this.styleMarginBody = this.currentLanguage == 'ar' ? 'margin-left: 100px;' : 'margin-right: 100px;';
  }
  
    logout(){
      
      const token = localStorage.getItem('token');
      
      if (token != null) {
        this.service.LogoutUsers().subscribe(
          succ => {
  
            this.route.navigate(['login']);
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            this.ngOnInit()
      
          },
          err => console.log(err)
        );
      }
      else {
       
        this.route.navigate(['dashboard']);
      }
    }
}
