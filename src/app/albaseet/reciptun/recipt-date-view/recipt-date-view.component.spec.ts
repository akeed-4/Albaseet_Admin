import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciptDateViewComponent } from './recipt-date-view.component';

describe('ReciptDateViewComponent', () => {
  let component: ReciptDateViewComponent;
  let fixture: ComponentFixture<ReciptDateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciptDateViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReciptDateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
