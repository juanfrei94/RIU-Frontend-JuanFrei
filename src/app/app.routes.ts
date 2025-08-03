import { Routes } from '@angular/router';
import { HEROES_ROUTES } from './modules/heroes/heroes.routes';

export const routes: Routes = [
  {
    path: 'heroes',
    loadComponent: () =>
      import('./modules/heroes/heroes').then((c) => c.Heroes),
    children: HEROES_ROUTES,
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'heroes',
  },
];
