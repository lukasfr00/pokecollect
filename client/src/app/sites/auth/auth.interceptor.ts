// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //console.log('AuthInterceptor: intercept method called');
    const accessToken = this.authService.getToken();
    let authReq = req;

    if (accessToken) {
      //console.log('AuthInterceptor: Adding Authorization header');
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        //console.log('AuthInterceptor: Error caught', error);
        if (
          error.status === 401 &&
          !authReq.url.includes('login') &&
          !authReq.url.includes('register')
        ) {
          //console.log('AuthInterceptor: Token expired, attempting refresh');
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              const newAccessToken = this.authService.getToken();
              /*console.log(
                'AuthInterceptor: New access token received',
                newAccessToken
              );*/
              if (newAccessToken) {
                const newAuthReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                });
                return next.handle(newAuthReq);
              }
              return throwError(error);
            }),
            catchError((err) => {
              console.log(
                'AuthInterceptor: Refresh token failed, logging out',
                err
              );
              this.authService.logout();
              return throwError(err);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
