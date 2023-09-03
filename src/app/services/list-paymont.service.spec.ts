import { TestBed } from '@angular/core/testing';

import { ListPaymontService } from './list-paymont.service';

describe('ListPaymontService', () => {
  let service: ListPaymontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPaymontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
