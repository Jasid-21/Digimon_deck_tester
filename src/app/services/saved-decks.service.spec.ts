import { TestBed } from '@angular/core/testing';

import { SavedDecksService } from './saved-decks.service';

describe('SavedDecksService', () => {
  let service: SavedDecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedDecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
