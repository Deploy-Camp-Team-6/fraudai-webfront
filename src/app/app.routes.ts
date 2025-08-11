import { Routes } from '@angular/router';
import { LayoutPage } from './pages/layout/layout.component';
import { LandingPage } from './pages/landing/landing.component';
import { DocsPage } from './pages/docs/docs.component';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
    canActivate: [noAuthGuard],
  },
  {
    path: '',
    component: LayoutPage,
    children: [
      {
        path: '',
        component: LandingPage,
        title: 'Fraud AI',
      },
      {
        path: 'docs',
        component: DocsPage,
        title: 'Fraud AI - Docs',
      },
      {
        path: 'playground',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/playground/playground.component').then(m => m.PlaygroundComponent),
        title: 'Fraud AI - Playground',
      },
      {
        path: 'keys',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/api-keys/api-keys.component').then(m => m.ApiKeysComponent),
        title: 'Fraud AI - API Keys',
      }
    ],
  },
  {
    path: 'login',
    redirectTo: 'auth/sign-in',
    pathMatch: 'full',
  },
];
