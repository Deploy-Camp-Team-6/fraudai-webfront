import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Model } from '../models/model.model';
import { STORAGE_KEYS } from '../constants';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ModelSelectorService {
  private http = inject(HttpClient);

  private availableModelsSubject = new BehaviorSubject<Model[]>([]);
  public availableModels$ = this.availableModelsSubject.asObservable();

  private selectedModelSubject = new BehaviorSubject<Model | null>(null);
  public selectedModel$ = this.selectedModelSubject.asObservable();

  constructor() {
    this.fetchModels();
  }

  private fetchModels() {
    const url = `${environment.apiBaseUrl}/v1/inference/models`;
    this.http.get<{ models: any[] }>(url).subscribe({
      next: res => {
        const models: Model[] = res.models.map(m => ({
          id: m.run_id,
          model_type: m.model_type,
          name: m.name,
          version: m.version,
          stage: m.stage,
          run_id: m.run_id,
          signature_inputs: m.signature_inputs,
        }));
        this.availableModelsSubject.next(models);
        this.loadInitialModel(models);
      },
      error: err => {
        console.error('Failed to load models:', err);
      },
    });
  }

  private loadInitialModel(models: Model[]) {
    try {
      const storedModel = localStorage.getItem(STORAGE_KEYS.MODEL_SELECTOR);
      if (storedModel) {
        const parsedModel = JSON.parse(storedModel);
        if (models.some(m => m.id === parsedModel.id)) {
          this.selectedModelSubject.next(parsedModel);
          return;
        }
      }
    } catch (e) {
      console.error('Error parsing stored model:', e);
      localStorage.removeItem(STORAGE_KEYS.MODEL_SELECTOR);
    }

    if (models.length > 0) {
      this.selectedModelSubject.next(models[0]);
    }
  }

  getAvailableModels(): Model[] {
    return [...this.availableModelsSubject.value];
  }

  setSelectedModel(model: Model) {
    localStorage.setItem(STORAGE_KEYS.MODEL_SELECTOR, JSON.stringify(model));
    this.selectedModelSubject.next(model);
  }

  getSelectedModel(): Model | null {
    return this.selectedModelSubject.value;
  }
}

