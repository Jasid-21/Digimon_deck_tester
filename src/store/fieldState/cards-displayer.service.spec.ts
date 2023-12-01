import { TestBed } from '@angular/core/testing';

import { CardsDisplayerService } from './cards-displayer.service';

describe('CardsDisplayerService', () => {
  let service: CardsDisplayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsDisplayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
