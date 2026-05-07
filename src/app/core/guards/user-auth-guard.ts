import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';


export const userAuthGuard: CanActivateFn = (route, state) => {
  
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getUserData()?.role

  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  if (!userRole) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (expectedRoles && expectedRoles.includes(userRole)) {
    return true;
  } else {
    router.navigate(['/auth/login']); 
    return false;
  }
};
