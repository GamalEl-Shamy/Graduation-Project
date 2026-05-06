import { Routes } from "@angular/router";


export const CATEGORIES_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'all_categories',
        pathMatch: 'full'
    },
    {
        path: 'all_categories',
        loadComponent: () => import('./pages/categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Categories Dashboard'
    },
    {
        path: 'add_new_category',
        loadComponent: () => import('./pages/add-new-category/add-new-category.component').then((c) => c.AddNewCategoryComponent),
        title: 'Add New Category'
    }
]

