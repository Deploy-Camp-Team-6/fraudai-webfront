import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { STORAGE_KEYS } from '../constants';
import { ApiKeyService } from '../services/api-key.service';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKeyService = inject(ApiKeyService);

  // Check for Playground API key first
  const playgroundKey = apiKeyService.getApiKey();
  if (playgroundKey) {
    const playgroundReq = req.clone({
      setHeaders: {
        'X-API-Key': playgroundKey,
      },
    });
    return next(playgroundReq);
  }

  // Then check for auth token
  return from(
    SecureStoragePlugin.get({ key: STORAGE_KEYS.AUTH_TOKEN })
  ).pipe(
    catchError(() => of({ value: null })),
    switchMap(({ value }) => {
      if (value) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${value}`,
          },
        });
        return next(authReq);
      }
      return next(req);
    })
  );
};
