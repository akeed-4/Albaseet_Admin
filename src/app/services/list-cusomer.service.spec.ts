import { TestBed } from '@angular/core/testing';

import { ListCusomerService } from './list-cusomer.service';

describe('ListCusomerService', () => {
  let service: ListCusomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListCusomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
