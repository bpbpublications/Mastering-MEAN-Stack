import { TestBed } from '@angular/core/testing';

import { ApiconfigService } from './apiconfig.service';

describe('ApiconfigService', () => {
  let service: ApiconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
