import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipteComponent } from './view-recipte.component';

describe('ViewRecipteComponent', () => {
  let component: ViewRecipteComponent;
  let fixture: ComponentFixture<ViewRecipteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRecipteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRecipteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
