import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UsageMetrics {
  calls: number;
  latency: number; // ms
  successRate: number; // percentage
}

@Injectable({ providedIn: 'root' })
export class MetricsService {
  getMetrics(): Observable<UsageMetrics> {
    // Mock metrics
    return of({ calls: 0, latency: 0, successRate: 100 });
  }
}
