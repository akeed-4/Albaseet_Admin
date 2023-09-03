import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviceComponent } from './invice.component';

describe('InviceComponent', () => {
  let component: InviceComponent;
  let fixture: ComponentFixture<InviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
