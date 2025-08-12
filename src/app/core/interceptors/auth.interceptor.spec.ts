import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { of, firstValueFrom } from 'rxjs';
import { authInterceptor } from './auth.interceptor';
import { ApiKeyService } from '../services/api-key.service';
import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

describe('authInterceptor', () => {
  let apiKeyServiceMock: any;
  let secureGetSpy: jasmine.Spy;

  beforeEach(() => {
    apiKeyServiceMock = {
      getApiKey: () => null,
    };

    secureGetSpy = spyOn(SecureStoragePlugin, 'get').and.returnValue(
      Promise.resolve({ value: null } as any)
    );

    TestBed.configureTestingModule({
      providers: [{ provide: ApiKeyService, useValue: apiKeyServiceMock }],
    });
  });


  it('should add an X-API-Key header when an API key is present', async () => {
    spyOn(apiKeyServiceMock, 'getApiKey').and.returnValue('test-api-key');
    const req = new HttpRequest('GET', '/test');
    const next = jasmine.createSpy().and.returnValue(of(null));
    await firstValueFrom(TestBed.runInInjectionContext(() => authInterceptor(req, next)));
    const handledReq = next.calls.mostRecent().args[0] as HttpRequest<any>;
    expect(handledReq.headers.get('X-API-Key')).toBe('test-api-key');
  });

  it('should prioritize API key over auth token', async () => {
    secureGetSpy.and.returnValue(Promise.resolve({ value: 'test-token' }));
    spyOn(apiKeyServiceMock, 'getApiKey').and.returnValue('test-api-key');
    const req = new HttpRequest('GET', '/test');
    const next = jasmine.createSpy().and.returnValue(of(null));
    await firstValueFrom(TestBed.runInInjectionContext(() => authInterceptor(req, next)));
    const handledReq = next.calls.mostRecent().args[0] as HttpRequest<any>;
    expect(handledReq.headers.has('X-API-Key')).toBeTrue();
    expect(handledReq.headers.has('Authorization')).toBeFalse();
  });

});
