import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInviocenotappReturnedComponent } from './report-inviocenotapp-returned.component';

describe('ReportInviocenotappReturnedComponent', () => {
  let component: ReportInviocenotappReturnedComponent;
  let fixture: ComponentFixture<ReportInviocenotappReturnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInviocenotappReturnedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportInviocenotappReturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
