import { TestBed } from '@angular/core/testing';

import { ModelSelectorService } from './model-selector.service';

describe('ModelSelectorService', () => {
  let service: ModelSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
