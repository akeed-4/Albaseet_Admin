import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvioceComponent } from './create-invioce.component';

describe('CreateInvioceComponent', () => {
  let component: CreateInvioceComponent;
  let fixture: ComponentFixture<CreateInvioceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInvioceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInvioceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
