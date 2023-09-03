import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAllInvioceVComponent } from './report-all-invioce-v.component';

describe('ReportAllInvioceVComponent', () => {
  let component: ReportAllInvioceVComponent;
  let fixture: ComponentFixture<ReportAllInvioceVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAllInvioceVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAllInvioceVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
