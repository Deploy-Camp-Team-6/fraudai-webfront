import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.initialized$.pipe(
    filter(Boolean),
    take(1),
    switchMap(() => authService.user$),
    take(1),
    map(user => {
      const isAuthenticated = !!user;
      if (isAuthenticated) {
        return true;
      }

      // Store the attempted URL for redirection after login
      localStorage.setItem('redirectUrl', state.url);

      // Redirect to the login page
      return router.createUrlTree(['/auth/sign-in']);
    })
  );
};
