import { TestBed } from '@angular/core/testing';

import { TestseveceService } from './testsevece.service';

describe('TestseveceService', () => {
  let service: TestseveceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestseveceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
