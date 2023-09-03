import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCashInviceComponent } from './report-cash-invice.component';

describe('ReportCashInviceComponent', () => {
  let component: ReportCashInviceComponent;
  let fixture: ComponentFixture<ReportCashInviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCashInviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCashInviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
