import { Routes } from '@angular/router';

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./heroes').then((c) => c.Heroes),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./components/hero-form/hero-form').then((c) => c.HeroForm),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/hero-form/hero-form').then((c) => c.HeroForm),
  },
];
