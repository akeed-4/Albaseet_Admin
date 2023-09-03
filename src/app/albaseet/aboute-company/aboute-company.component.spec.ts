import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbouteCompanyComponent } from './aboute-company.component';

describe('AbouteCompanyComponent', () => {
  let component: AbouteCompanyComponent;
  let fixture: ComponentFixture<AbouteCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbouteCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbouteCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
