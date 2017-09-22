import { TestBed, inject } from '@angular/core/testing';

import { BackstopService } from './backstop.service';

describe('BackstopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackstopService]
    });
  });

  it('should be created', inject([BackstopService], (service: BackstopService) => {
    expect(service).toBeTruthy();
  }));
});
