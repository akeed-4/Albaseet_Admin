import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectlanguageComponent } from './selectlanguage.component';

describe('SelectlanguageComponent', () => {
  let component: SelectlanguageComponent;
  let fixture: ComponentFixture<SelectlanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectlanguageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectlanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
