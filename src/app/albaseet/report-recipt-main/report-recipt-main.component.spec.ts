import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReciptMainComponent } from './report-recipt-main.component';

describe('ReportReciptMainComponent', () => {
  let component: ReportReciptMainComponent;
  let fixture: ComponentFixture<ReportReciptMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReciptMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportReciptMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
