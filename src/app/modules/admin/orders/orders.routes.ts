import { Routes } from "@angular/router";


export const ORDERS_ROUTES: Routes = [
    {
        path: 'all_orders',
        loadComponent: () => import('./pages/orders/orders.component').then((c) => c.OrdersComponent),
        title: 'Orders Dashboard'
    }
]

