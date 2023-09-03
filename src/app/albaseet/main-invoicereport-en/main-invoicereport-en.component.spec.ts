import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInvoicereportENComponent } from './main-invoicereport-en.component';

describe('MainInvoicereportENComponent', () => {
  let component: MainInvoicereportENComponent;
  let fixture: ComponentFixture<MainInvoicereportENComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainInvoicereportENComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainInvoicereportENComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
