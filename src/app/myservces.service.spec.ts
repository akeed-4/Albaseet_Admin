import { TestBed } from '@angular/core/testing';

import { MyservcesService } from './myservces.service';

describe('MyservcesService', () => {
  let service: MyservcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyservcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
