import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { ApiKeyService } from '../services/api-key.service';
import { STORAGE_KEYS } from '../constants';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let apiKeyServiceMock: any;

  beforeEach(() => {
    apiKeyServiceMock = {
      getApiKey: () => null,
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        { provide: ApiKeyService, useValue: apiKeyServiceMock },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.PLAYGROUND_KEY);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header when a token is present', () => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'test-token');
    http.get('/test').subscribe();
    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('should add an X-API-Key header when an API key is present', () => {
    spyOn(apiKeyServiceMock, 'getApiKey').and.returnValue('test-api-key');
    http.get('/test').subscribe();
    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('X-API-Key')).toBe(true);
    expect(req.request.headers.get('X-API-Key')).toBe('test-api-key');
    req.flush({});
  });

  it('should prioritize API key over auth token', () => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'test-token');
    spyOn(apiKeyServiceMock, 'getApiKey').and.returnValue('test-api-key');
    http.get('/test').subscribe();
    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('X-API-Key')).toBe(true);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('should not add any header if no token or api key is present', () => {
    http.get('/test').subscribe();
    const req = httpMock.expectOne('/test');
    expect(req.request.headers.has('Authorization')).toBe(false);
    expect(req.request.headers.has('X-API-Key')).toBe(false);
    req.flush({});
  });
});
