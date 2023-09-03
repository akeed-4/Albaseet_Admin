import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomer3Component } from './view-customer3.component';

describe('ViewCustomer3Component', () => {
  let component: ViewCustomer3Component;
  let fixture: ComponentFixture<ViewCustomer3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCustomer3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCustomer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
