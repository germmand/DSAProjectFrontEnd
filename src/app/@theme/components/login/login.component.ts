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

        this.requestResponseMessage = response.message;
        this.responseAlertClasses = {
          ...this.responseAlertClasses,
          'alert-success': true,
          'alert-danger': false,
        };

        return observableOf({ successful: true });
      }), catchError(exception => {
        this.requestResponseMessage = exception.status !== 0
          ? exception.error.error
          : 'Servidor en mantenimiento, volveremos pronto...';

        this.responseAlertClasses = {
          ...this.responseAlertClasses,
          'alert-success': false,
          'alert-danger': true,
        };

        return observableOf({ successful: false });
      }))
      .subscribe(request => {
        // If the request was successful,
        // the button will remain disabled; otherwise, it'll be activated back.
        // requestMade is the variable linked to the [disabled] attribute of the submit button.
        this.requestMade = request.successful;

        if (request.successful) {
          this.router.navigate(['/pages/inicio']);
        }
      });
  }
}
