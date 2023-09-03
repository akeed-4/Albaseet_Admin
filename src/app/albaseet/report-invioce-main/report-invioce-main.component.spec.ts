import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInvioceMainComponent } from './report-invioce-main.component';

describe('ReportInvioceMainComponent', () => {
  let component: ReportInvioceMainComponent;
  let fixture: ComponentFixture<ReportInvioceMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInvioceMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportInvioceMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
