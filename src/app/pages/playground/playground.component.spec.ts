import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
      imports: [PlaygroundComponent],
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
