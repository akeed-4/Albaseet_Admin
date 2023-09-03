import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymontMethodComponent } from './list-paymont-method.component';

describe('ListPaymontMethodComponent', () => {
  let component: ListPaymontMethodComponent;
  let fixture: ComponentFixture<ListPaymontMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPaymontMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPaymontMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
