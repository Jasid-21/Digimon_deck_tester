import { TestBed } from '@angular/core/testing';

import { FieldsServiceService } from './fields-service.service';

describe('FieldsServiceService', () => {
  let service: FieldsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
