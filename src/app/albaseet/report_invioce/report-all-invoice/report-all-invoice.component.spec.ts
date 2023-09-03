import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllInvoiceComponent } from './report-all-invoice.component';

describe('ReportAllInvoiceComponent', () => {
  let component: ReportAllInvoiceComponent;
  let fixture: ComponentFixture<ReportAllInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAllInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAllInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
