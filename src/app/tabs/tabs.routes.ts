import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'playground',
        loadComponent: () =>
          import('../playground/playground.page').then((m) => m.PlaygroundPage),
      },
      {
        path: 'keys',
        loadComponent: () =>
          import('../api-keys/api-keys.page').then((m) => m.ApiKeysPage),
      },
      {
        path: 'metrics',
        loadComponent: () =>
          import('../metrics/metrics.page').then((m) => m.MetricsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/playground',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/playground',
    pathMatch: 'full',
  },
];
