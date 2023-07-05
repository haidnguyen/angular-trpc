import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () => import('@angular-trpc/demo/feature-home').then(m => m.FeatureHomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('@angular-trpc/demo/feature-login').then(m => m.FeatureLoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('@angular-trpc/demo/feature-register').then(m => m.FeatureRegisterComponent),
  },
];
