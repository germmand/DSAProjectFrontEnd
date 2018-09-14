import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { IAppState } from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getAccessToken, SignIn } from '../store/auth';
import { catchError, filter, first, flatMap, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../data/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshTokenInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<any>;

  constructor(private store: Store<IAppState>,
              private authService: AuthService) {
    this.refreshTokenInProgress = false;
    this.accessTokenSubject = new BehaviorSubject<any>(null);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.pipe(
      select(getAccessToken),
      first(),
      flatMap(access_token => {
        const authReq = this.addTokenToRequest(req, access_token);

        return req.url.includes('/auth/refresh')
          ? next.handle(req)
          : next.handle(authReq);
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          const errorResponse = <HttpErrorResponse>(error);

          switch (errorResponse.status) {
            case 401:
              if (req.url.includes('/auth/login')) {
                return throwError(errorResponse);
              }

              if (!this.refreshTokenInProgress) {
                this.refreshTokenInProgress = true;
                this.accessTokenSubject.next(null);

                return this.onHandling401UnauthorizedRequests(req, next, errorResponse);
              }

              return this.accessTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => {
                  const authReq = this.addTokenToRequest(req, token);

                  return next.handle(authReq);
                }),
              );
          }
        }

        return throwError(error);
      }),
    );
  }

  onHandling401UnauthorizedRequests(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    return this.authService.onRefreshToken()
      .pipe(
        switchMap(response => {
          this.store.dispatch(new SignIn({
            access_token: response.access_token,
            refresh_token: response.refresh_token,
          }));

          const authReq = this.addTokenToRequest(req, response.access_token);

          this.accessTokenSubject.next(response.access_token);
          this.refreshTokenInProgress = false;

          return next.handle(authReq);
        }),
        catchError(exception => {
          this.refreshTokenInProgress = false;

          return throwError(exception);
        }),
      );
  }

  private addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
}
