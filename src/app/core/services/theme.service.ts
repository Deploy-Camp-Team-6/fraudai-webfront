import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private dark = false;

  get isDark(): boolean {
    return this.dark;
  }

  toggleDarkTheme(shouldAdd: boolean): void {
    this.dark = shouldAdd;
    document.body.classList.toggle('dark', shouldAdd);
  }
}

