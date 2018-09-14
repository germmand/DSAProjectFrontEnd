import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppState } from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getAccessToken, SignIn } from '../store/auth';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
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
      switchMap(access_token => {
        const authReq = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + access_token,
          },
        });

        return next.handle(authReq);
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          const errorResponse = <HttpErrorResponse>(error);

          switch (errorResponse.status) {
            case 401:
              if (!this.refreshTokenInProgress) {
                this.refreshTokenInProgress = true;
                this.accessTokenSubject.next(null);

                return this.onHandling401Unauthorized(req, next, errorResponse);
              }

              return this.accessTokenSubject.pipe(
                filter(token => token !== null),
                take(1),
                switchMap(token => {
                  const authReq = req.clone({
                    setHeaders: { Authorization: 'Bearer ' + token },
                  });

                  return next.handle(authReq);
                }),
              );
          }
        }

        return Observable.throw(error);
      }));
  }

  onHandling401Unauthorized(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    return this.authService.onRefreshToken().pipe(
      switchMap(response => {
        this.store.dispatch(new SignIn({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        }));

        this.accessTokenSubject.next(response.access_token);
        const authReq = req.clone({
          setHeaders: {
            Authorization: 'Bearer ' + response.access_token,
          },
        });

        this.refreshTokenInProgress = false;

        return next.handle(authReq);
      }),
      catchError(exception => {
        this.refreshTokenInProgress = false;

        return Observable.throw(exception);
      }),
    );
  }
}
