import { HttpErrorResponse, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { STORAGE_KEYS } from '../constants';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const toastService = inject(ToastService);
  const router = inject(Router);

  // Loop guard for auth requests
  if (req.url.includes('/v1/auth/')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          const playgroundKey = localStorage.getItem(STORAGE_KEYS.PLAYGROUND_KEY);
          if (playgroundKey) {
            toastService.presentError('Invalid API key or permission denied.');
          } else {
            authService.signOut(); // My signOut is already silent
            router.navigate(['/auth/sign-in'], { queryParams: { returnUrl: router.url } });
            toastService.presentError('Session expired. Please sign in again.');
          }
          break;
        case 403:
          toastService.presentError('You don’t have permission to perform this action.');
          break;
        case 500:
        default:
          toastService.presentError('An unexpected server error occurred. Please try again.');
          break;
      }
      return throwError(() => error);
    })
  );
};
