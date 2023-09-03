import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetialsPaymontComponent } from './detials-paymont.component';

describe('DetialsPaymontComponent', () => {
  let component: DetialsPaymontComponent;
  let fixture: ComponentFixture<DetialsPaymontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetialsPaymontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetialsPaymontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
