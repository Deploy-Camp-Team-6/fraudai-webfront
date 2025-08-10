import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ApiKey {
  id: string;
  name: string;
  value: string;
  created: Date;
}

@Injectable({ providedIn: 'root' })
export class ApiKeyService {
  private keys: ApiKey[] = [
    { id: '1', name: 'Default Key', value: 'sk-123', created: new Date() },
  ];

  listKeys(): Observable<ApiKey[]> {
    return of(this.keys);
  }

  createKey(name: string): Observable<ApiKey> {
    const key: ApiKey = {
      id: Math.random().toString(36).slice(2),
      name,
      value: 'sk-' + Math.random().toString(36).slice(2),
      created: new Date(),
    };
    this.keys.push(key);
    return of(key);
  }

  revokeKey(id: string): Observable<void> {
    this.keys = this.keys.filter((k) => k.id !== id);
    return of(void 0);
  }

  regenerateKey(id: string): Observable<ApiKey | undefined> {
    const key = this.keys.find((k) => k.id === id);
    if (key) {
      key.value = 'sk-' + Math.random().toString(36).slice(2);
    }
    return of(key);
  }
}
