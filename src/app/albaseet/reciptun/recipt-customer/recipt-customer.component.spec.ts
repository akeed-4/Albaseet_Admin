import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptCustomerComponent } from './recipt-customer.component';

describe('ReciptCustomerComponent', () => {
  let component: ReciptCustomerComponent;
  let fixture: ComponentFixture<ReciptCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
