import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private dark = false;

  constructor() {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    this.dark = stored === 'dark';
    this.apply();
  }

  isDark(): boolean {
    return this.dark;
  }

  setDark(isDark: boolean): void {
    this.dark = isDark;
    this.apply();
    localStorage.setItem(STORAGE_KEYS.THEME, isDark ? 'dark' : 'light');
  }

  toggle(): void {
    this.setDark(!this.dark);
  }

  private apply(): void {
    this.document.body.classList.toggle('dark', this.dark);
  }
}