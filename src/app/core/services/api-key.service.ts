import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyService {
  private apiKeyActiveSubject = new BehaviorSubject<boolean>(false);
  public isApiKeyActive$ = this.apiKeyActiveSubject.asObservable();

  constructor() {
    this.checkInitialApiKey();
  }

  private checkInitialApiKey() {
    const key = localStorage.getItem(STORAGE_KEYS.PLAYGROUND_KEY);
    this.apiKeyActiveSubject.next(!!key);
  }

  setApiKey(key: string | null) {
    if (key) {
      localStorage.setItem(STORAGE_KEYS.PLAYGROUND_KEY, key);
      this.apiKeyActiveSubject.next(true);
    } else {
      localStorage.removeItem(STORAGE_KEYS.PLAYGROUND_KEY);
      this.apiKeyActiveSubject.next(false);
    }
  }

  getApiKey(): string | null {
    return localStorage.getItem(STORAGE_KEYS.PLAYGROUND_KEY);
  }
}
