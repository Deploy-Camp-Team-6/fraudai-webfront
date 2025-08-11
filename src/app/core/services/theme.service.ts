import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark$ = new BehaviorSubject<boolean>(false);

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDark$.next(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) => this.isDark$.next(mediaQuery.matches));
  }

  toggle() {
    this.isDark$.next(!this.isDark$.value);
  }
}
