import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Router } from '@angular/router';
import { errorInterceptor } from './error.interceptor';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { STORAGE_KEYS } from '../constants';

describe('ErrorInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authServiceMock: any;
  let toastServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      signOut: jasmine.createSpy('signOut'),
    };
    toastServiceMock = {
      presentError: jasmine.createSpy('presentError'),
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
      url: '/test',
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.removeItem(STORAGE_KEYS.PLAYGROUND_KEY);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle 401 error for JWT auth', (done) => {
    http.get('/test').subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(HttpErrorResponse);
        expect(authServiceMock.signOut).toHaveBeenCalled();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/auth/sign-in'], { queryParams: { returnUrl: '/test' } });
        expect(toastServiceMock.presentError).toHaveBeenCalledWith('Session expired. Please sign in again.');
        done();
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle 401 error for API key auth', (done) => {
    localStorage.setItem(STORAGE_KEYS.PLAYGROUND_KEY, 'test-api-key');
    http.get('/test').subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(HttpErrorResponse);
        expect(authServiceMock.signOut).not.toHaveBeenCalled();
        expect(toastServiceMock.presentError).toHaveBeenCalledWith('Invalid API key or permission denied.');
        done();
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle 403 error', (done) => {
    http.get('/test').subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(HttpErrorResponse);
        expect(toastServiceMock.presentError).toHaveBeenCalledWith('You don’t have permission to perform this action.');
        done();
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 403, statusText: 'Forbidden' });
  });

  it('should handle 500 error', (done) => {
    http.get('/test').subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(HttpErrorResponse);
        expect(toastServiceMock.presentError).toHaveBeenCalledWith('An unexpected server error occurred. Please try again.');
        done();
      },
    });

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should ignore auth requests', () => {
    http.get('/v1/auth/sign-in').subscribe({
      error: (err) => {
        // We expect the error to be thrown, but not handled by our interceptor logic
        expect(err).toBeInstanceOf(HttpErrorResponse);
      }
    });
    const req = httpMock.expectOne('/v1/auth/sign-in');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(authServiceMock.signOut).not.toHaveBeenCalled();
    expect(toastServiceMock.presentError).not.toHaveBeenCalled();
  });
});
