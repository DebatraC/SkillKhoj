import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }

      const requiredRole = route.data?.['role'];
      if (!requiredRole) {
        return true; // No role requirement
      }

      if (user.role.toLowerCase() === requiredRole.toLowerCase()) {
        return true;
      } else {
        // Redirect based on user's actual role
        if (user.role.toLowerCase() === 'student') {
          router.navigate(['/student/homepage']);
        } else if (user.role.toLowerCase() === 'recruiter') {
          router.navigate(['/recruiter/homepage']);
        } else {
          router.navigate(['/login']);
        }
        return false;
      }
    })
  );
};
