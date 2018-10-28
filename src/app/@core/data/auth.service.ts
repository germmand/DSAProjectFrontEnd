import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetEndPointFullPath } from '../utils/api.config';
import { IAppState } from '../store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getRefreshToken } from '../store/auth';
import { first, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private httpOptions;

  constructor(private http: HttpClient,
              private store: Store<IAppState>) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  onLogin(loginData: FormGroup): Observable<any> {
    return this.http.post(GetEndPointFullPath('/auth/login'),
                          loginData.value,
                          this.httpOptions);
  }

  onRegistration(registrationForm: FormGroup): Observable<any> {
    return this.http.post(GetEndPointFullPath('/users/'),
                          registrationForm.value,
                          this.httpOptions);
  }

  onRefreshToken(): Observable<any> {
    return this.store.pipe(
      select(getRefreshToken),
      first(),
      switchMap(refresh_token => {
          return this.http.get(GetEndPointFullPath('/auth/refresh'), {
            headers: new HttpHeaders({
              'Authorization': 'Bearer ' + refresh_token,
            }),
          });
      }));
  }

  onLogoutAccess(): Observable<any> {
    // The authorization header is appended in the Http Interceptor.
    return this.http.get(GetEndPointFullPath('/auth/access/logout'),
                         this.httpOptions);
  }

  onLogoutRefresh(): Observable<any> {
    return this.store.pipe(
      select(getRefreshToken),
      first(),
      switchMap(refresh_token => {
        return this.http.get(GetEndPointFullPath('/auth/refresh/logout'), {
          headers: new HttpHeaders({
            'Authorization': 'Bearer ' + refresh_token,
          }),
        });
      }),
    );
  }
}
