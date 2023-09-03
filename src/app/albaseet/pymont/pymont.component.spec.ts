import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PymontComponent } from './pymont.component';

describe('PymontComponent', () => {
  let component: PymontComponent;
  let fixture: ComponentFixture<PymontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PymontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PymontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
