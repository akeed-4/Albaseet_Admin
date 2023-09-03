import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRecipterportENComponent } from './main-recipterport-en.component';

describe('MainRecipterportENComponent', () => {
  let component: MainRecipterportENComponent;
  let fixture: ComponentFixture<MainRecipterportENComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRecipterportENComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRecipterportENComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
