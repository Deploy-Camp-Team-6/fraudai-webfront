import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AuthResponse } from '../models/auth-response.model';
import { environment } from '../../../environments/environment';
import { STORAGE_KEYS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    this.loadInitialUser();
  }

  private loadInitialUser() {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      this.me().subscribe();
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
    return this.http.post<AuthResponse>(`${environment.apiBaseUrl}/v1/auth/sign-in`, credentials).pipe(
      tap((response) => this.setAuth(response))
    );
  }

  me(): Observable<User | null> {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
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
  }

  signOut(silent = true) {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    this.userSubject.next(null);
    if (!silent) {
      // In the future, we might want to show a global toast message here.
      // For now, the component or interceptor initiating the sign-out is responsible for user feedback.
    }
  }

  private setAuth(response: AuthResponse) {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    this.userSubject.next(response.user);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.value;
  }
}
