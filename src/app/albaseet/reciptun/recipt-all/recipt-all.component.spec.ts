import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptAllComponent } from './recipt-all.component';

describe('ReciptAllComponent', () => {
  let component: ReciptAllComponent;
  let fixture: ComponentFixture<ReciptAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
