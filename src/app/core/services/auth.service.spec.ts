import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(SecureStoragePlugin, 'get').and.returnValue(Promise.resolve({ value: null } as any));
    spyOn(SecureStoragePlugin, 'set').and.returnValue(Promise.resolve({ value: true }));
    spyOn(SecureStoragePlugin, 'remove').and.returnValue(Promise.resolve({ value: true }));
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
    const mockUser: User = { id: '1', email: 'test@example.com', name: 'Test User' };
    const mockResponse: AuthResponse = { user: mockUser, token: 'test-token' };

    service.signIn({ email: 'test@example.com', password: 'password' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/v1/auth/sign-in`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(SecureStoragePlugin.set).toHaveBeenCalledWith({ key: STORAGE_KEYS.AUTH_TOKEN, value: 'test-token' });
    service.user$.subscribe(user => {
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
    service.user$.subscribe((user) => {
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

    expect(SecureStoragePlugin.set).toHaveBeenCalledWith({ key: STORAGE_KEYS.AUTH_TOKEN, value: 'new-token' });
    service.user$.subscribe(user => {
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
    service.user$.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should sign out a user and remove the token', () => {
    service.signOut();
    expect(SecureStoragePlugin.remove).toHaveBeenCalledWith({ key: STORAGE_KEYS.AUTH_TOKEN });
    service.user$.subscribe(user => {
      expect(user).toBeNull();
    });
  });

  it('should get the current user if a token is present', fakeAsync(() => {
    const mockUser: User = { id: '1', email: 'test@example.com', name: 'Test User' };
    (SecureStoragePlugin.get as jasmine.Spy).and.returnValue(Promise.resolve({ value: 'test-token' }));

    service.me().subscribe();
    tick();

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/v1/auth/me`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
    tick();

    service.user$.subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  }));
});
