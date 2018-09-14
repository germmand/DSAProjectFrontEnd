import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../@core/data/auth.service';
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
  public requestResponseMessage: string;
  public responseAlertClasses: any;
  public requestMade: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<IAppState>) {
    this.loginForm = new FormGroup({
      email: new FormControl('email@email.com'),
      password: new FormControl('my_shitty_password'),
    });

    this.requestResponseMessage = '';
    this.requestMade = false;
    this.responseAlertClasses = {
      'alert': true,
      'alert-success': false,
      'alert-danger': false,
    };
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
    this.requestMade = true;

    this.authService.onLogin(this.loginForm)
      .subscribe(response => {
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

        this.requestResponseMessage = response.message;
        this.responseAlertClasses = {
          ...this.responseAlertClasses,
          'alert-success': true,
          'alert-danger': false,
        };

        this.router.navigate(['/pages/inicio']);
      }, exception => {
        this.requestMade = false;

        this.requestResponseMessage = exception.status !== 0
          ? exception.error.error
          : 'Servidor en mantenimiento, volveremos pronto...';

        this.responseAlertClasses = {
          ...this.responseAlertClasses,
          'alert-success': false,
          'alert-danger': true,
        };
      });
  }
}
