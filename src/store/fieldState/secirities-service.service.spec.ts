import { TestBed } from '@angular/core/testing';

import { SecuritiesServiceService } from './securities-service.service';

describe('SeciritiesServiceService', () => {
  let service: SecuritiesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuritiesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
