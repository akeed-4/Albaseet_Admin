import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditSalesInvoiceComponent } from './credit-sales-invoice.component';

describe('CreditSalesInvoiceComponent', () => {
  let component: CreditSalesInvoiceComponent;
  let fixture: ComponentFixture<CreditSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditSalesInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
