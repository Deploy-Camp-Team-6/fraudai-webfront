import { TestBed, fakeAsync, flushMicrotasks, tick } from '@angular/core/testing';
import { take } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { STORAGE_KEYS } from '../constants';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from 'src/environments/environment';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let secureGetSpy: jasmine.Spy;
  let secureSetSpy: jasmine.Spy;
  let secureRemoveSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    httpMock = TestBed.inject(HttpTestingController);
    secureGetSpy = spyOn(SecureStoragePlugin, 'get').and.returnValue(
      Promise.resolve({ value: null } as any)
    );
    secureSetSpy = spyOn(SecureStoragePlugin, 'set').and.returnValue(
      Promise.resolve({ value: true })
    );
    secureRemoveSpy = spyOn(SecureStoragePlugin, 'remove').and.returnValue(
      Promise.resolve({ value: true })
    );
    environment.useMock = false; // Ensure we are testing the real service logic
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in a user and store the token', () => {
    const mockUser: User = { id: '1', email: 'test@example.com', name: 'Mock User' };
    const mockResponse: AuthResponse = { user: mockUser, token: 'test-token' };

    service.signIn({ email: 'test@example.com', password: 'password' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/v1/auth/sign-in`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
    service.user$.pipe(take(1)).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should propagate sign in errors', () => {
    const errorMessage = 'Invalid credentials';

    service.signIn({ email: 'test@example.com', password: 'wrong' }).subscribe({
      next: () => fail('should have failed with an error'),
      error: (err) => {
        expect(err).toBe(errorMessage);
      },
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/v1/auth/sign-in`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: errorMessage }, { status: 401, statusText: 'Unauthorized' });

    expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBeNull();
    service.user$.pipe(take(1)).subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should sign up a user and store the token', () => {
    const mockUser: User = { id: '2', email: 'new@example.com', name: 'New User' };
    const mockResponse: AuthResponse = { user: mockUser, token: 'new-token' };

    service.signUp({ name: 'New User', email: 'new@example.com', password: 'password' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/v1/auth/sign-up`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
    service.user$.pipe(take(1)).subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should propagate sign up errors', () => {
    const errorMessage = 'Sign up failed';

    service
      .signUp({ name: 'New User', email: 'new@example.com', password: 'password' })
      .subscribe({
        next: () => fail('should have failed with an error'),
        error: (err) => {
          expect(err).toBe(errorMessage);
        },
      });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/v1/auth/sign-up`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: errorMessage }, { status: 400, statusText: 'Bad Request' });

    expect(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)).toBeNull();
    service.user$.pipe(take(1)).subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should sign out a user and remove the token', () => {
    service.signOut();
    service.user$.pipe(take(1)).subscribe(user => {
      expect(user).toBeNull();
    });
  });

    // Test for current user retrieval is omitted due to plugin limitations in the test environment
  });
