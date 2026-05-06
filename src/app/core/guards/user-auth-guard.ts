import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';


export const userAuthGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles = route.data['roles'] as Array<string>;
  const userRole = authService.getUserData()?.role

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
