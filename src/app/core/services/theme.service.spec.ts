import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';
import { DOCUMENT } from '@angular/common';
import { STORAGE_KEYS } from '../constants';

describe('ThemeService', () => {
  let service: ThemeService;
  let documentRef: Document;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEYS.THEME);
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    documentRef = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle dark class and persist choice', () => {
    service.setDark(true);
    expect(documentRef.body.classList.contains('dark')).toBeTrue();
    expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe('dark');

    service.toggle();
    expect(documentRef.body.classList.contains('dark')).toBeFalse();
    expect(localStorage.getItem(STORAGE_KEYS.THEME)).toBe('light');
  });
});
