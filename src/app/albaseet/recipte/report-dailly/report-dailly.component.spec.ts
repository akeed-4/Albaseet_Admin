import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDaillyComponent } from './report-dailly.component';

describe('ReportDaillyComponent', () => {
  let component: ReportDaillyComponent;
  let fixture: ComponentFixture<ReportDaillyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDaillyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDaillyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
