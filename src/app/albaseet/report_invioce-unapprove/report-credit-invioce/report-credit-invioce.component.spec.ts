import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCreditInvioceComponent } from './report-credit-invioce.component';

describe('ReportCreditInvioceComponent', () => {
  let component: ReportCreditInvioceComponent;
  let fixture: ComponentFixture<ReportCreditInvioceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCreditInvioceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCreditInvioceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
