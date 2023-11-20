import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormfiltingComponent } from './formfilting.component';

describe('FormfiltingComponent', () => {
  let component: FormfiltingComponent;
  let fixture: ComponentFixture<FormfiltingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormfiltingComponent]
    });
    fixture = TestBed.createComponent(FormfiltingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
