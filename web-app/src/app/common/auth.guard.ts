import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const checkSession = async (authService: AuthService): Promise<boolean> => {
  let isLoggedIn = false;
  authService.checkSession().subscribe((resp: any) => {
    if (resp.loggedIn) {
      isLoggedIn = true;
    }
  });

  await new Promise((f) => setTimeout(f, 500));
  return isLoggedIn;
}

export const authGuard = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = await checkSession(authService);

  if (isLoggedIn) {
    return true;
  } else {
    return router.parseUrl('');
  }
};

export const authGuardMain = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const isLoggedIn = await checkSession(authService);

  if (isLoggedIn && router.url == '/')
    return router.parseUrl('/home');
  return true;
};

export const authGuardLogin = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let isLoggedIn = await checkSession(authService);

  if (isLoggedIn) {
    return router.parseUrl('/home');
  } else {
    return true;
  }
};
