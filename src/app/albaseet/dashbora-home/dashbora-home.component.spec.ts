import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboraHomeComponent } from './dashbora-home.component';

describe('DashboraHomeComponent', () => {
  let component: DashboraHomeComponent;
  let fixture: ComponentFixture<DashboraHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboraHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboraHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
