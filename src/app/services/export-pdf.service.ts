
import { Injectable } from '@angular/core';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { CurrentUserService } from './current-user.service';
import { CurrentSettingService } from './current-setting.service';
import { staticFontData } from 'src/assets/fonts/ar/fonts-static';


@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {

  constructor(private currentSettingService:CurrentSettingService) { }

  exportPdfDataGrid(e:any,fileName:string,landscape:boolean){
    const doc = new jsPDF({
      orientation: landscape ?'l' : 'p',

});
    var header = this.currentSettingService.getCompanyName();
    var footer = this.currentSettingService.getCompanAddress();

    const myFont = staticFontData.parastooNormal;
    doc.addFileToVFS('Parastoo-normal.ttf', myFont);
    doc.addFont('Parastoo-normal.ttf', 'Parastoo-normal', 'normal');
    doc.setFont('Parastoo-normal');
    doc.setFontSize(50);

    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
      indent: 5,
    }).then(() => {
      this.addHeaderCompanyName(doc,header);
      this.addPageNumberInFooter(doc,footer);
      doc.save(fileName + '.pdf');
    });
  }


  addHeaderCompanyName(doc : any,header?:String) {
   // Get the number of pages
   const pageCount = (doc as any).internal.getNumberOfPages();
   // For each page, print the page number and the total pages
   for (let i = 1; i <= pageCount; i++) {
     doc.setFontSize(10);
     // Go to page i
     doc.setPage(i);
     var pageSize = doc.internal.pageSize;
     var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
     if(header){
       doc.text(header, doc.internal.pageSize.getWidth() / 2 , 8);
     }
   }
}

  addPageNumberInFooter(doc : any,footer?:String) {
     // Footer i.e Page 1 of 4
    // Get the number of pages
    const pageCount = (doc as any).internal.getNumberOfPages();
    // For each page, print the page number and the total pages
    for (let i = 1; i <= pageCount; i++) {
      doc.setFontSize(10);
      // Go to page i
      doc.setPage(i);
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      if(footer){
        doc.text(footer, doc.internal.pageSize.getWidth() / 2, pageHeight - 8);
      }
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), 8, pageHeight - 8); //data.settings.margin.left if you want it on the left
    }
}
}
