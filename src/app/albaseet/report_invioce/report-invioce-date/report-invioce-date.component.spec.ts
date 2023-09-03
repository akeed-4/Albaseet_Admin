import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInvioceDateComponent } from './report-invioce-date.component';

describe('ReportInvioceDateComponent', () => {
  let component: ReportInvioceDateComponent;
  let fixture: ComponentFixture<ReportInvioceDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportInvioceDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportInvioceDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
