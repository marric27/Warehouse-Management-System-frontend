import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');

  if (token && !req.url.includes('/login')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('authToken'); // pulisci token
        router.navigate(['/login']);          // rimanda al login
      }
      return throwError(() => error);
    })
  );
};
