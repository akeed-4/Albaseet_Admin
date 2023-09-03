import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeleletComponent } from './customer-delelet.component';

describe('CustomerDeleletComponent', () => {
  let component: CustomerDeleletComponent;
  let fixture: ComponentFixture<CustomerDeleletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDeleletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDeleletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
