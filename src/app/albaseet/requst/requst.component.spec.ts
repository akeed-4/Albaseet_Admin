import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequstComponent } from './requst.component';

describe('RequstComponent', () => {
  let component: RequstComponent;
  let fixture: ComponentFixture<RequstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
