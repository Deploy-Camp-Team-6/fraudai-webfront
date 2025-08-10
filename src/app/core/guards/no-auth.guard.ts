import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const noAuthGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      const isAuthenticated = !!user;
      if (isAuthenticated) {
        // Redirect to the playground if the user is already authenticated
        return router.createUrlTree(['/playground']);
      }
      return true;
    })
  );
};
