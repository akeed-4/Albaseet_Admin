import { TestBed } from '@angular/core/testing';

import { GrudesService } from './grudes.service';

describe('GrudesService', () => {
  let service: GrudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
