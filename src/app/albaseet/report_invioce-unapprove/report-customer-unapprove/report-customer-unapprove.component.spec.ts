import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerUnapproveComponent } from './report-customer-unapprove.component';

describe('ReportCustomerUnapproveComponent', () => {
  let component: ReportCustomerUnapproveComponent;
  let fixture: ComponentFixture<ReportCustomerUnapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCustomerUnapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCustomerUnapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
