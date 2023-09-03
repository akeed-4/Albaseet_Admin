import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReciptComponent } from './create-recipt.component';

describe('CreateReciptComponent', () => {
  let component: CreateReciptComponent;
  let fixture: ComponentFixture<CreateReciptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReciptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
