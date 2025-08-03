import { Routes } from '@angular/router';

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/heroes-page/heroes-page').then((c) => c.HeroesPage),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/hero-form-page/hero-form-page').then(
        (c) => c.HeroFormPage
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/hero-form-page/hero-form-page').then(
        (c) => c.HeroFormPage
      ),
  },
];
