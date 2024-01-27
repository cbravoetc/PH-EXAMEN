import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'publicaciones',
    loadComponent: () => import('./publicaciones/publicaciones.page').then( m => m.PublicacionesPage)
  },
  {
    path: '',
    redirectTo: 'publicaciones',
    pathMatch: 'full',
  },
  {
    path: 'publicacion',
    loadComponent: () => import('./publicacion/publicacion.page').then( m => m.PublicacionPage)
  },
];
