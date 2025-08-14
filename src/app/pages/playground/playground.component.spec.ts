import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PlaygroundComponent } from './playground.component';
import { ModelSelectorService } from 'src/app/core/services/model-selector.service';

class MockModelSelectorService {
  availableModels$ = of([]);
  selectedModel$ = of(null);
  setSelectedModel() {}
  getSelectedModel() {
    return null;
  }
}

describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PlaygroundComponent, HttpClientTestingModule],
      providers: [{ provide: ModelSelectorService, useClass: MockModelSelectorService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
