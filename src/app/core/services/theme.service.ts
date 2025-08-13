import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { STORAGE_KEYS } from '../constants';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // A signal to hold the current theme ('light' or 'dark').
  theme = signal<Theme>('light');

  constructor() {
    // We only run theme logic in the browser.
    if (this.isBrowser) {
      this.loadInitialTheme();
    }

    // An effect that automatically runs when the `theme` signal changes.
    // It applies the theme to the DOM and persists it to localStorage.
    effect(() => {
      const newTheme = this.theme();
      if (this.isBrowser) {
        this.document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
      }
    });
  }

  /**
   * Loads the theme from localStorage if it exists, otherwise falls back
   * to the user's OS-level preference.
   */
  private loadInitialTheme(): void {
    const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Set the initial theme based on storage, or system preference as a fallback.
    this.theme.set(storedTheme || (systemPrefersDark ? 'dark' : 'light'));
  }

  /**
   * Toggles the current theme between 'light' and 'dark'.
   */
  public toggleTheme(): void {
    this.theme.update(current => (current === 'light' ? 'dark' : 'light'));
  }
}