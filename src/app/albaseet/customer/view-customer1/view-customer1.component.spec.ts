import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomer1Component } from './view-customer1.component';

describe('ViewCustomer1Component', () => {
  let component: ViewCustomer1Component;
  let fixture: ComponentFixture<ViewCustomer1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomer1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomer1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
