import { TestBed } from '@angular/core/testing';

import { GameBoothService } from './game-booth.service';

describe('GameBoothService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameBoothService = TestBed.get(GameBoothService);
    expect(service).toBeTruthy();
  });
});
