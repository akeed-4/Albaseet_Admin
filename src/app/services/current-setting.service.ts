import { LanguageService } from './language.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentSettingService {
  fontSize = 14;
  constructor(private languageService :LanguageService) { }

  getCompanyName(){
    var language = this.languageService.getCurrentLanguage();
    //getCurrentCompany() // todo PRODUCTION
    return language == 'ar' ? 'مؤسسة خدمات الوسيط لتقنية المعلومات' : 'Default Company Name'
  }

  getCompanAddress(){
    var language = this.languageService.getCurrentLanguage();
    return language == 'ar' ? 'عنوان الشركة الافتراضي' : 'Default Company Address'
  }

  getCurrentCompany(){
    // Get Company Name From Local Storage that registered from settings page
   return localStorage.getItem('currentCompany') || 'مؤسسة خدمات الوسيط لتقنية المعلومات' ;
  }

  getUserGridFontSize(){
    return localStorage.getItem('gridFontSize') != null ? parseInt(localStorage.getItem('gridFontSize') || '14') : 14;
  }
}
