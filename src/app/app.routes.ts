import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'users', loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent) },
  { path: 'calender', loadComponent: () => import('./features/calender/calender.component').then(m => m.CalenderComponent) },
  { path: '**', redirectTo: 'dashboard' }
];
