import { Routes } from '@angular/router';
import { userAuthGuard } from './core/guards/user-auth-guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/visitor/visitor.routes').then((m) => m.VISITOR_ROUTES)
    },
    {
        path:"auth", 
        loadChildren:()=>import('./modules/auth/auth.routes').then((m)=>m.AUTH_ROUTES)
    },
    {
        path:"users",
        loadChildren:()=>import('./modules/user/user.routes').then((m)=>m.USER_ROUTES),
        // canActivate:[userAuthGuard]
    },
    {
        path:"vendors",
        loadChildren:()=>import('./modules/vendor/vendor.routes').then((m)=>m.VENDOR_ROUTES)
    },
    {
        path:"**",
        loadComponent:()=>import('./shared/components/not-found/not-found.component').then((c)=>c.NotFoundComponent)
    }
];
