import { Routes } from "@angular/router";
import { VisitorLayoutComponent } from "../../layouts/visitor-layout/visitor-layout.component";

export const VISITOR_ROUTES: Routes = [
    {
        path: '', component: VisitorLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'visitor',
                pathMatch: 'full'
            },
            {
                path: 'visitor',
                loadComponent: () => import('./pages/home-visitor/home-visitor.component').then((c) => c.HomeVisitorComponent),
                title: 'Zaraa'
            }
        ]
    }
]