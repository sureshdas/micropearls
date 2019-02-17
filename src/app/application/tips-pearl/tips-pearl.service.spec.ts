import { TestBed } from '@angular/core/testing';

import { TipsPearlService } from './tips-pearl.service';

describe('TipsPearlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipsPearlService = TestBed.get(TipsPearlService);
    expect(service).toBeTruthy();
  });
});
