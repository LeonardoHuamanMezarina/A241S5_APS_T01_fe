import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },

  { 
    path: 'users', 
    loadComponent: () => import('./features/users/users.component').then(m => m.UsersComponent) 
  },

  { 
    path: 'notifications', 
    loadComponent: () => import('./features/notifications/notifications.component').then(m => m.NotificationsComponent) 
  },

  { path: '**', redirectTo: 'dashboard' }
];