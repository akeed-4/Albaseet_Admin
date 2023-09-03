import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReciptDateComponent } from './report-recipt-date.component';

describe('ReportReciptDateComponent', () => {
  let component: ReportReciptDateComponent;
  let fixture: ComponentFixture<ReportReciptDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReciptDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportReciptDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
