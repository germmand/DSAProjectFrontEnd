import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../@core/data/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolesService } from '../../../@core/data/roles.service';
import { of as observableOf } from 'rxjs';
import { catchError, delay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registrationLayoutForm: FormGroup;
  public responseMessage: string;
  public alertResponseClasses: any;
  public requestMade: boolean;
  public registrationFormSubmitted: boolean;

  // This may be removed in the future for better implementation...
  private studentId: number;

  constructor(private authService: AuthService,
              private roleService: RolesService,
              private router: Router) {
    this.registrationLayoutForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      cid: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmationPassword: new FormControl('', [Validators.required]),
    });

    this.studentId = null;
    this.responseMessage = '';
    this.requestMade = false;
    this.registrationFormSubmitted = false;
    this.alertResponseClasses = {
      'alert': true,
      'alert-success': false,
      'alert-danger': false,
    };
  }


  ngOnInit(): void {
    this.requestMade = true;

    this.roleService.getRoleByName('Estudiante')
      .subscribe(response => {
        this.studentId = response.role.id;
        this.requestMade = false;
      });
  }

  onSignUp() {
    this.registrationFormSubmitted = true;

    if (!this.registrationLayoutForm.valid) {
      return;
    }

    this.requestMade = true;

    this.authService.onRegistration(this.castRegistrationForm())
      .pipe(switchMap(response => {
        this.responseMessage = response.message;
        this.alertResponseClasses = {
          ...this.alertResponseClasses,
          'alert-success': true,
          'alert-danger': false,
        };

        return observableOf({ successful: true });
      }), delay(
        1500,
      ), catchError(exception => {
        this.requestMade = false;

        this.alertResponseClasses = {
          ...this.alertResponseClasses,
          'alert-success': false,
          'alert-danger': true,
        };

        if (exception.status === 0) {
          this.responseMessage = 'Servidor en mantenimiento, volveremos pronto...';
          return;
        }

        this.responseMessage = exception.error.error;

        return observableOf({ successful: false }) ;
      }))
      .subscribe( result => {
        if (result.successful) {
          this.router.navigate(['/auth/login']);
        }
      });
  }

  get registrationForm(): any {
    return this.registrationLayoutForm.controls;
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
