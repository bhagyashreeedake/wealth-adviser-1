import { TestBed } from '@angular/core/testing';

import { IncomeExpenceService } from './income-expence.service';

describe('IncomeExpenceService', () => {
  let service: IncomeExpenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomeExpenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
