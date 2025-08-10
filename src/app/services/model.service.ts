import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ModelInfo {
  id: string;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ModelService {
  private http = inject(HttpClient);

  constructor() {}

  getModels(): Observable<ModelInfo[]> {
    // Mock single model; replace with real API call when backend is ready
    return of([{ id: 'default', name: 'Default Fraud Model v1' }]);
    // return this.http.get<ModelInfo[]>(`${environment.API_BASE_URL}/models`);
  }

  runInference(modelId: string, input: string): Observable<{ output: string }> {
    // return this.http.post<{ output: string }>(`${environment.API_BASE_URL}/models/${modelId}:predict`, { input });
    return of({ output: `Mock result for "${input}"` });
  }
}
