import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ThemeService } from './theme.service';
import { STORAGE_KEYS } from '../constants';

describe('ThemeService', () => {
  let documentRef: Document;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEYS.THEME);
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    documentRef = TestBed.inject(DOCUMENT);
  });

  function createService(): ThemeService {
    return TestBed.runInInjectionContext(() => new ThemeService());
  }

  it('should be created', () => {
    const service = createService();
    expect(service).toBeTruthy();
  });

  it('should toggle theme and persist choice', fakeAsync(() => {
    const service = createService();
    // Set a predictable start state for the test
    service.theme.set('light');
    tick(); // Let the effect run once to set initial state

    // Toggle to dark
    service.toggleTheme();
    tick();

    expect(service.theme()).toBe('dark');
    expect(documentRef.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe('dark');

    // Toggle back to light
    service.toggleTheme();
    tick();

    expect(service.theme()).toBe('light');
    expect(documentRef.documentElement.getAttribute('data-theme')).toBe('light');
    expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe('light');
  }));

  it('should initialize from localStorage if a theme is stored', () => {
    localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    const newService = createService();
    expect(newService.theme()).toBe('dark');
  });
});