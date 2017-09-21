import { TestBed, inject } from '@angular/core/testing';

import { LinkGeneratorService } from './link-generator.service';

describe('LinkGeneratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinkGeneratorService]
    });
  });

  it('should be created', inject([LinkGeneratorService], (service: LinkGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
