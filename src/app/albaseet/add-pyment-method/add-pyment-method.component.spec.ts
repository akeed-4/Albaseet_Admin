import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPymentMethodComponent } from './add-pyment-method.component';

describe('AddPymentMethodComponent', () => {
  let component: AddPymentMethodComponent;
  let fixture: ComponentFixture<AddPymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPymentMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
