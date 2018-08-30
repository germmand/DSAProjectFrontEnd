import {Component} from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor() {
  }

  onLoggingIn() {
    alert('What\'s up, fellas?');
  }
}
