import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidCashInvoiceComponent } from './paid-cash-invoice.component';

describe('PaidCashInvoiceComponent', () => {
  let component: PaidCashInvoiceComponent;
  let fixture: ComponentFixture<PaidCashInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidCashInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidCashInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
