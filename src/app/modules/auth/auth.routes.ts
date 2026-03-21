import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then((c) => c.RegisterComponent),
        title: 'Register',
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((c) => c.LoginComponent),
        title: 'Login',
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent,
          ),
        title: 'Forgot Password',
      },
    ],
  },
];
