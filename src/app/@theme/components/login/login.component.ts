import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {LoginService} from '../../../@core/data/login.service';
import {IAppState} from '../../../@core/store/app.reducer';
import {Store} from '@ngrx/store';
import * as auth from '../../../@core/store/auth';
import * as user from '../../../@core/store/user';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private loginService: LoginService,
              private store: Store<IAppState>) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLoggingIn() {
    this.loginService.onLogin(this.loginForm)
      .subscribe(response => {
        this.store.dispatch(new auth.SignIn({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        }));

        this.store.dispatch(new user.LoadUserData({
          id: response.user.id,
          email: response.user.email,
          full_name: response.user.full_name,
          role: response.user.role,
        }));
        // Redirect here...
      }, error => {
        // Show error dialog here...
      });
  }
}
