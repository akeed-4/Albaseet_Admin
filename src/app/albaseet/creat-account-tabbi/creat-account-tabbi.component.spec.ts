import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatAccountTabbiComponent } from './creat-account-tabbi.component';

describe('CreatAccountTabbiComponent', () => {
  let component: CreatAccountTabbiComponent;
  let fixture: ComponentFixture<CreatAccountTabbiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatAccountTabbiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatAccountTabbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
