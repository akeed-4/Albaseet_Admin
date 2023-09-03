import { TestBed } from '@angular/core/testing';

import { ControlRoleService } from './control-role.service';

describe('ControlRoleService', () => {
  let service: ControlRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
