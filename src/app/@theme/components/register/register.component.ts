import {Component} from '@angular/core';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor() {
  }

  onSignUp() {
    alert('Hey, what\'s up, fellas?');
  }
}
