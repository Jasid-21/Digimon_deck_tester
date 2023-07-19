import { TestBed } from '@angular/core/testing';

import { HatchsServiceService } from './hatchs-service.service';

describe('HatchsServiceService', () => {
  let service: HatchsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HatchsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
