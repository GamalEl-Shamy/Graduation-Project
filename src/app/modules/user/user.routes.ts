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
                path: 'weather',
                loadComponent: () => import('./pages/weather/weather.component').then((c) => c.WeatherComponent),
                title: 'Diagnosis'
            },
            {
                path: 'shop',
                loadComponent: () => import('./pages/shop/shop.component').then((c) => c.ShopComponent),
                title: 'Shop'
            },
            {
                path: 'shop/product-details/:name/:id',
                loadComponent: () => import('./pages/product-details/product-details.component').then((c) => c.ProductDetailsComponent),
                title: 'Product Details'
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart.component').then((c) => c.CartComponent),
                title: 'Cart'
            },
            {
                path: 'cart/shopping-details',
                loadComponent: () => import('./pages/shopping-details/shopping-details.component').then((c) => c.ShoppingDetailsComponent),
                title: 'Shopping Details'
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
            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile.component').then((c) => c.ProfileComponent),
                title: 'My Profile'
            },
        ]
    }
] 