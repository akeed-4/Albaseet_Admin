import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrequstComponent } from './addrequst.component';

describe('AddrequstComponent', () => {
  let component: AddrequstComponent;
  let fixture: ComponentFixture<AddrequstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddrequstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrequstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
