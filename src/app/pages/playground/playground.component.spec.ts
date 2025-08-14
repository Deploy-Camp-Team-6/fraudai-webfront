import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PlaygroundComponent } from './playground.component';
import { ModelSelectorService } from 'src/app/core/services/model-selector.service';
import { Model } from 'src/app/core/models/model.model';
import { environment } from 'src/environments/environment';

const mockModel: Model = {
  id: 'run-id-1',
  model_type: 'logreg',
  name: 'FraudDetector-logistic_regression',
  version: '1',
  stage: 'None',
  run_id: 'run-id-1',
  signature_inputs: ['transaction_id', 'amount', 'merchant_type', 'device_type'],
};

class MockModelSelectorService {
  availableModels$ = of([mockModel]);
  selectedModel$ = of(mockModel);
  setSelectedModel() {}
  getSelectedModel() {
    return mockModel;
  }
}

describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlaygroundComponent, HttpClientTestingModule],
      providers: [{ provide: ModelSelectorService, useClass: MockModelSelectorService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send model_type and required features', () => {
    component.requestBody = JSON.stringify(
      {
        transaction_id: 9876543210,
        amount: 200.12,
        merchant_type: 'electronics',
        device_type: 'laptop',
        extra_field: 'ignore',
      },
      null,
      2,
    );

    component.runInference();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/v1/inference/predict`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      model: 'logreg',
      features: {
        transaction_id: 9876543210,
        amount: 200.12,
        merchant_type: 'electronics',
        device_type: 'laptop',
      },
    });

    req.flush({});
    expect(component.isLoading).toBeFalse();
  });
});
