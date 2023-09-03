import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProduct1Component } from './view-product1.component';

describe('ViewProduct1Component', () => {
  let component: ViewProduct1Component;
  let fixture: ComponentFixture<ViewProduct1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewProduct1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProduct1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
