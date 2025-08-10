import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { STORAGE_KEYS } from '../constants';
import { ApiKeyService } from '../services/api-key.service';

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
  const authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
