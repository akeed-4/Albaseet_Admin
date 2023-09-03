import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDaitalsDateComponent } from './report-daitals-date.component';

describe('ReportDaitalsDateComponent', () => {
  let component: ReportDaitalsDateComponent;
  let fixture: ComponentFixture<ReportDaitalsDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDaitalsDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDaitalsDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
