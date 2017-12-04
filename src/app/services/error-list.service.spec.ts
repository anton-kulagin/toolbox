import { TestBed, inject } from '@angular/core/testing';

import { ErrorListService } from './error-list.service';

describe('ErrorListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorListService]
    });
  });

  it('should be created', inject([ErrorListService], (service: ErrorListService) => {
    expect(service).toBeTruthy();
  }));
});
