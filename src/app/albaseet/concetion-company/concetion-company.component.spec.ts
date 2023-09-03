import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcetionCompanyComponent } from './concetion-company.component';

describe('ConcetionCompanyComponent', () => {
  let component: ConcetionCompanyComponent;
  let fixture: ComponentFixture<ConcetionCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcetionCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcetionCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
