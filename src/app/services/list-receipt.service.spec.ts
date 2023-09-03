import { TestBed } from '@angular/core/testing';

import { ListReceiptService } from './list-receipt.service';

describe('ListReceiptService', () => {
  let service: ListReceiptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListReceiptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
