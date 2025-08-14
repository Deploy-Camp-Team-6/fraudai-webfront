import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ModelSelectorService } from './model-selector.service';

describe('ModelSelectorService', () => {
  let service: ModelSelectorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ModelSelectorService);
    httpMock = TestBed.inject(HttpTestingController);

    httpMock
      .expectOne('http://localhost:8000/api/v1/inference/models')
      .flush({ models: [] });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
