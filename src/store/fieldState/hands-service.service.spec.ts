import { TestBed } from '@angular/core/testing';

import { HandsServiceService } from './hands-service.service';

describe('HandsServiceService', () => {
  let service: HandsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
