import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle dark theme', () => {
    service.toggleDarkTheme(true);
    expect(service.isDark).toBeTrue();
    service.toggleDarkTheme(false);
    expect(service.isDark).toBeFalse();
  });
});

