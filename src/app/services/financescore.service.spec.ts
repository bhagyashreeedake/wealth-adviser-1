import { TestBed } from '@angular/core/testing';

import { FinancescoreService } from './financescore.service';

describe('FinancescoreService', () => {
  let service: FinancescoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancescoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
