import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRecieptVComponent } from './all-reciept-v.component';

describe('AllRecieptVComponent', () => {
  let component: AllRecieptVComponent;
  let fixture: ComponentFixture<AllRecieptVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRecieptVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllRecieptVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
