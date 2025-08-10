import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Model } from '../models/model.model';
import { STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ModelSelectorService {
  // In a real app, this would be fetched from an API
  private availableModels: Model[] = [
    { id: '1', name: 'FraudNet', version: '1.0.0', alias: 'latest' },
    { id: '2', name: 'FraudNet', version: '0.9.0' },
    { id: '3', name: 'RiskGuard', version: '2.1.0', alias: 'beta' },
  ];

  private selectedModelSubject = new BehaviorSubject<Model | null>(null);
  public selectedModel$ = this.selectedModelSubject.asObservable();

  constructor() {
    this.loadInitialModel();
  }

  private loadInitialModel() {
    try {
      const storedModel = localStorage.getItem(STORAGE_KEYS.MODEL_SELECTOR);
      if (storedModel) {
        const parsedModel = JSON.parse(storedModel);
        // Basic validation to ensure the stored model is valid
        if (this.availableModels.some(m => m.id === parsedModel.id)) {
          this.selectedModelSubject.next(parsedModel);
          return;
        }
      }
    } catch (e) {
      console.error('Error parsing stored model:', e);
      localStorage.removeItem(STORAGE_KEYS.MODEL_SELECTOR);
    }
    // Set default model if nothing valid is stored
    this.selectedModelSubject.next(this.availableModels[0]);
  }

  getAvailableModels(): Model[] {
    return this.availableModels;
  }

  setSelectedModel(model: Model) {
    localStorage.setItem(STORAGE_KEYS.MODEL_SELECTOR, JSON.stringify(model));
    this.selectedModelSubject.next(model);
  }

  getSelectedModel(): Model | null {
    return this.selectedModelSubject.value;
  }
}
