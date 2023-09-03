import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllReciptComponent } from './report-all-recipt.component';

describe('ReportAllReciptComponent', () => {
  let component: ReportAllReciptComponent;
  let fixture: ComponentFixture<ReportAllReciptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAllReciptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAllReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
