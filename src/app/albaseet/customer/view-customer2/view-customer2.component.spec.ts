import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomer2Component } from './view-customer2.component';

describe('ViewCustomer2Component', () => {
  let component: ViewCustomer2Component;
  let fixture: ComponentFixture<ViewCustomer2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomer2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
