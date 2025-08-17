import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError, from, lastValueFrom } from 'rxjs';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../../environments/environment';
import { STORAGE_KEYS } from '../constants';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  private initializedSubject = new BehaviorSubject<boolean>(false);
  public initialized$ = this.initializedSubject.asObservable();

  constructor() {
    this.loadInitialUser();
  }

  private async loadInitialUser() {
    try {
      const { value } = await SecureStoragePlugin.get({ key: STORAGE_KEYS.AUTH_TOKEN });
      if (value) {
        await lastValueFrom(this.me());
      }
    } catch {
      // ignore missing token
    } finally {
      this.initializedSubject.next(true);
    }
  }

  signIn(credentials: { email: string; password: string }): Observable<AuthResponse> {
    if (environment.useMock) {
      const mockUser: User = { id: '1', email: credentials.email, name: 'Mock User' };
      const mockResponse: AuthResponse = { user: mockUser, token: 'mock.token.123' };
      return of(mockResponse).pipe(
        tap((response) => this.setAuth(response))
      );
    }
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/v1/auth/sign-in`, credentials)
      .pipe(
        tap((response) => this.setAuth(response)),
        catchError((err) => this.handleError(err))
      );
  }

  signUp(data: { name: string; email: string; password: string }): Observable<AuthResponse> {
    if (environment.useMock) {
      const mockUser: User = { id: '1', email: data.email, name: data.name };
      const mockResponse: AuthResponse = { user: mockUser, token: 'mock.token.123' };
      return of(mockResponse).pipe(tap((response) => this.setAuth(response)));
    }
    return this.http
      .post<AuthResponse>(`${environment.apiBaseUrl}/v1/auth/sign-up`, data)
      .pipe(
        tap((response) => this.setAuth(response)),
        catchError((err) => this.handleError(err))
      );
  }

  me(): Observable<User | null> {
    return from(
      SecureStoragePlugin.get({ key: STORAGE_KEYS.AUTH_TOKEN })
        .then((res) => res.value)
        .catch(() => null)
    ).pipe(
      switchMap((token) => {
        if (!token) {
          return of(null);
        }

        if (environment.useMock) {
          const mockUser: User = { id: '1', email: 'test@example.com', name: 'Mock User' };
          this.userSubject.next(mockUser);
          return of(mockUser);
        }

        return this.http.get<User>(`${environment.apiBaseUrl}/v1/auth/me`).pipe(
          tap((user) => this.userSubject.next(user)),
          catchError(() => {
            this.signOut();
            return of(null);
          })
        );
      })
    );
  }

  signOut(silent = true) {
    SecureStoragePlugin.remove({ key: STORAGE_KEYS.AUTH_TOKEN });
    this.userSubject.next(null);
    if (!silent) {
      // In the future, we might want to show a global toast message here.
      // For now, the component or interceptor initiating the sign-out is responsible for user feedback.
    }
  }

  private setAuth(response: AuthResponse) {
    SecureStoragePlugin.set({ key: STORAGE_KEYS.AUTH_TOKEN, value: response.token });
    this.userSubject.next(response.user);
  }

  private handleError(error: any) {
    const message = error?.error?.message || 'An unexpected error occurred';
    return throwError(() => message);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }
}
