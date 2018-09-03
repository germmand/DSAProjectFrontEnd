import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../../../@core/data/login.service';
import {IAppState} from '../../../@core/store/app.reducer';
import {Store, select} from '@ngrx/store';
import {Router} from '@angular/router';
import * as auth from '../../../@core/store/auth';
import * as user from '../../../@core/store/user';
import {observable, of as observableOf} from 'rxjs';
import {catchError, delay, switchMap} from 'rxjs/operators';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public requestMade: boolean;

  constructor(private loginService: LoginService,
              private router: Router,
              private store: Store<IAppState>) {
    this.loginForm = new FormGroup({
      email: new FormControl('email@email.com'),
      password: new FormControl('my_shitty_password'),
    });
    this.requestMade = false;
  }

  ngOnInit(): void {
    this.store.pipe(select(auth.getAccessToken))
      .subscribe(access_token => {
        if (access_token !== '') {
          this.router.navigate(['/pages/inicio']);
        }
      });
  }

  onLoggingIn() {
    this.loginService.onLogin(this.loginForm)
      .pipe(switchMap(response => {
        this.store.dispatch(new auth.SignIn({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        }));

        this.store.dispatch(new user.LoadUserData({
          id: response.user.id,
          email: response.user.email,
          full_name: response.user.fullname,
          role: response.user.role,
        }));

        return observableOf({ successful: true });
      }), catchError(error => {
        return observableOf({ successful: false });
      }))
      .subscribe(request => {
        if (request.successful) {
          this.router.navigate(['/pages/inicio']);
        }
      });
  }
}
