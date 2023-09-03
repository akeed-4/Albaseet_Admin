import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProductUnapproveComponent } from './report-product-unapprove.component';

describe('ReportProductUnapproveComponent', () => {
  let component: ReportProductUnapproveComponent;
  let fixture: ComponentFixture<ReportProductUnapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProductUnapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportProductUnapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
