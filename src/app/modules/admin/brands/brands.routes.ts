import { Routes } from "@angular/router";


export const BRANDS_ROUTES: Routes = [
    {
        path: 'all_brands',
        loadComponent: () => import('./pages/brands/brands.component').then((c) => c.BrandsComponent),
        title: 'Brands Dashboard'
    },
    {
        path: 'add_new_brand',
        loadComponent: () => import('./pages/add-new-brand/add-new-brand.component').then((c) => c.AddNewBrandComponent),
        title: 'Add New Brand'
    },
]

