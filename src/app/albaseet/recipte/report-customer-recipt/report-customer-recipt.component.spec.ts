import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerReciptComponent } from './report-customer-recipt.component';

describe('ReportCustomerReciptComponent', () => {
  let component: ReportCustomerReciptComponent;
  let fixture: ComponentFixture<ReportCustomerReciptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCustomerReciptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCustomerReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
