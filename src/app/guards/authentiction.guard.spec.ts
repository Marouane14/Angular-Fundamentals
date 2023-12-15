import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authentictionGuard } from './authentiction.guard';

describe('authentictionGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authentictionGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
