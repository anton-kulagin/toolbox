import { TestBed, inject } from '@angular/core/testing';

import { TestProcessStateService } from './test-process-state.service';

describe('TestProcessStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestProcessStateService]
    });
  });

  it('should be created', inject([TestProcessStateService], (service: TestProcessStateService) => {
    expect(service).toBeTruthy();
  }));
});
