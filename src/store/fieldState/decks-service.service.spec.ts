import { TestBed } from '@angular/core/testing';

import { DecksServiceService } from './decks-service.service';

describe('DecksServiceService', () => {
  let service: DecksServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecksServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
