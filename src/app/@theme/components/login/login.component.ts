import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {LoginService} from '../../../@core/data/login.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(private loginService: LoginService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onLoggingIn() {
    this.loginService.onLogin(this.loginForm)
      .subscribe(response => {
        alert('Yey!');
      }, error => {
        alert('Uh oh! Something went terribly wrong! :(');
      });
  }
}
