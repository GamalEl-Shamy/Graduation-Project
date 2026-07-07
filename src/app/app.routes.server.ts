import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'users/shop/product-details/:name/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'users/diagnosis-details/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
