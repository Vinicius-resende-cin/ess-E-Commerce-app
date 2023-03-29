import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = false;

  authService.checkSession().subscribe((resp: any) => {
    if (resp.loggedIn) {
      isLoggedIn = true;
    }
  });

  await new Promise((f) => setTimeout(f, 1000));

  if (isLoggedIn) {
    return true;
  } else {
    return router.parseUrl('/login');
  }
};

export const authGuardReverse = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = false;

  authService.checkSession().subscribe((resp: any) => {
    if (resp.loggedIn) {
      isLoggedIn = true;
    }
  });

  await new Promise((f) => setTimeout(f, 1000));

  if (isLoggedIn) {
    return () => {
      router.parseUrl('/home');
      return false;
    };
  } else {
    return true;
  }
};
