import { TestBed } from '@angular/core/testing';

import { PitadinhasService } from './pitadinhas.service';

describe('PitadinhasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PitadinhasService = TestBed.get(PitadinhasService);
    expect(service).toBeTruthy();
  });
});
