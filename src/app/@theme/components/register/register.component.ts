import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/data/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService } from '../../../@core/data/roles.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registrationLayoutForm: FormGroup;

  // This may be removed in the future for better implementation...
  private studentId: number;

  constructor(private authService: AuthService,
              private roleService: RolesService,
              private router: Router) {
    this.registrationLayoutForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      cid: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmationPassword: new FormControl(''),
    });

    this.studentId = null;
  }

  ngOnInit(): void {
    this.roleService.getRoleByName('Estudiante')
      .subscribe(response => {
        this.studentId = response.role.id;
      });
  }

  onSignUp() {
    this.authService.onRegistration(this.castRegistrationForm())
      .subscribe(response => {

        this.router.navigate(['/auth/login']);
      }, error => {

      });
  }

  // The returned form is the one sent to the API.
  private castRegistrationForm(): FormGroup {
    const data = this.registrationLayoutForm.value;

    return new FormGroup({
      id: new FormControl(data['cid']),
      fullname: new FormControl(data['firstName'] + data['lastName']),
      email: new FormControl(data['email']),
      password: new FormControl(data['password']),
      role_id: new FormControl(this.studentId),
    });
  }
}
