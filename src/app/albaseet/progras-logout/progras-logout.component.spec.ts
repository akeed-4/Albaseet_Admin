import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrograsLogoutComponent } from './progras-logout.component';

describe('PrograsLogoutComponent', () => {
  let component: PrograsLogoutComponent;
  let fixture: ComponentFixture<PrograsLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrograsLogoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrograsLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
