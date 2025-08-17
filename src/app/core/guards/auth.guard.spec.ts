import { TestBed } from '@angular/core/testing';
import { Router, CanActivateFn, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Subject, BehaviorSubject } from 'rxjs';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      user$: of(null),
      initialized$: of(true),
    };
    routerMock = {
      createUrlTree: jasmine.createSpy('createUrlTree').and.returnValue(new UrlTree()),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should allow activation when user is authenticated', (done) => {
    authServiceMock.user$ = of({ id: '1', email: 'test@test.com' });
    authServiceMock.initialized$ = of(true);
    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as any;
    canActivate.subscribe((result: boolean) => {
      expect(result).toBe(true);
      done();
    });
  });

  it('should deny activation and redirect when user is not authenticated', (done) => {
    authServiceMock.user$ = of(null);
    authServiceMock.initialized$ = of(true);
    const canActivate = executeGuard({} as ActivatedRouteSnapshot, { url: '/protected' } as RouterStateSnapshot) as any;
    canActivate.subscribe((result: UrlTree) => {
      expect(routerMock.createUrlTree).toHaveBeenCalledWith(['/auth/sign-in']);
      expect(localStorage.getItem('redirectUrl')).toBe('/protected');
      expect(result).toBeInstanceOf(UrlTree);
      done();
    });
  });

  it('should wait for initialization before allowing activation with stored user', (done) => {
    const userSubject = new BehaviorSubject<any>(null);
    const initializedSubject = new Subject<boolean>();
    authServiceMock.user$ = userSubject.asObservable();
    authServiceMock.initialized$ = initializedSubject.asObservable();

    const canActivate = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as any;
    canActivate.subscribe((result: boolean) => {
      expect(result).toBe(true);
      done();
    });

    userSubject.next({ id: '1', email: 'test@test.com' });
    initializedSubject.next(true);
  });
});
