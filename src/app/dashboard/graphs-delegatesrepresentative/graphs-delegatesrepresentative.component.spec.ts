import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsDelegatesrepresentativeComponent } from './graphs-delegatesrepresentative.component';

describe('GraphsDelegatesrepresentativeComponent', () => {
  let component: GraphsDelegatesrepresentativeComponent;
  let fixture: ComponentFixture<GraphsDelegatesrepresentativeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraphsDelegatesrepresentativeComponent]
    });
    fixture = TestBed.createComponent(GraphsDelegatesrepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
