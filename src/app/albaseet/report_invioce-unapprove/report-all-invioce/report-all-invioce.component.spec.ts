import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllInvioceComponent } from './report-all-invioce.component';

describe('ReportAllInvioceComponent', () => {
  let component: ReportAllInvioceComponent;
  let fixture: ComponentFixture<ReportAllInvioceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAllInvioceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAllInvioceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
