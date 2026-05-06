import { Routes } from "@angular/router";

export const PRODUCTS_ROUTES: Routes = [
    {
        path: 'all_products',
        loadComponent: () => import('./pages/products/products.component').then((c) => c.ProductsComponent),
        title: 'Products Dashboard'
    },
    {
        path: 'add_new_product',
        loadComponent: () => import('./pages/add-new-product/add-new-product.component').then((c) => c.AddNewProductComponent),
        title: 'Add New Product'
    },
]