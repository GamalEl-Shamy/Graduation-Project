import { Routes } from '@angular/router';
import { userAuthGuard } from '../../../core/guards/user-auth-guard';

export const USERS_ROUTES: Routes = [
  {
    path: 'all_users',
    loadComponent: () => import('./pages/users/users.component').then((c) => c.UsersComponent),
    canActivate: [userAuthGuard],
    data: { roles: ['SuperAdmin'] },
    title: 'Users Dashboard',
  },
];
