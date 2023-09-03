import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDateInvoiceUnComponent } from './report-date-invoice-un.component';

describe('ReportDateInvoiceUnComponent', () => {
  let component: ReportDateInvoiceUnComponent;
  let fixture: ComponentFixture<ReportDateInvoiceUnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDateInvoiceUnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDateInvoiceUnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
