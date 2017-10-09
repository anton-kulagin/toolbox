import { TestBed, inject } from '@angular/core/testing';

import { TestConfigService } from './test-config.service';

describe('TestConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestConfigService]
    });
  });

  it('should be created', inject([TestConfigService], (service: TestConfigService) => {
    expect(service).toBeTruthy();
  }));
});
