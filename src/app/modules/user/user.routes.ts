import { Routes } from "@angular/router";
import { UserLayoutComponent } from "../../layouts/user-layout/user-layout.component";

export const USER_ROUTES: Routes = [
    {
        path:'', component:UserLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/user-dashboard/user-dashboard.component').then((c) => c.UserDashboardComponent),
                title: 'User - Dashboard'
            },
            {
                path: 'diagnosis',
                loadComponent: () => import('./pages/diagnosis/diagnosis.component').then((c) => c.DiagnosisComponent),
                title: 'Diagnosis'
            },
            {
                path: 'shop',
                loadComponent: () => import('./pages/shop/shop.component').then((c) => c.ShopComponent),
                title: 'Shop'
            },
            {
                path: 'diagnosis-history',
                loadComponent: () => import('./pages/diagnosis-history/diagnosis-history.component').then((c) => c.DiagnosisHistoryComponent),
                title: 'Diagnosis History'
            },
            {
                path: 'my-garden',
                loadComponent: () => import('./pages/my-garden/my-garden.component').then((c) => c.MyGardenComponent),
                title: 'My Garden'
            },
        ]
    }
] 