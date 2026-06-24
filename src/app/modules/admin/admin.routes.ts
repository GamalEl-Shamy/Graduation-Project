import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "../../layouts/admin-layout/admin-layout.component";
import { USERS_ROUTES } from "./users/users.routes";
import { CATEGORIES_ROUTES } from "./categories/categories.routes";
import { BRANDS_ROUTES } from "./brands/brands.routes";
import { ORDERS_ROUTES } from "./orders/orders.routes";
import { PRODUCTS_ROUTES } from "./products/products.routes";
import { DASHBOARD_ROUTES } from "./dashboard/dashboard.routes";

export const ADMIN_ROUTES: Routes = [
    {
        path: '', component: AdminLayoutComponent,
        children: [
            ...DASHBOARD_ROUTES,
            ...USERS_ROUTES,
            ...CATEGORIES_ROUTES,
            ...BRANDS_ROUTES,
            ...ORDERS_ROUTES,
            ...PRODUCTS_ROUTES,
        ]
    }
]