import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInvioceReturnedComponent } from './report-invioce-returned.component';

describe('ReportInvioceReturnedComponent', () => {
  let component: ReportInvioceReturnedComponent;
  let fixture: ComponentFixture<ReportInvioceReturnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInvioceReturnedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportInvioceReturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
