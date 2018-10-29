import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../@core/store/app.reducer';
import { getId, LoadUserData } from '../../../@core/store/user';
import { delay, switchMap } from 'rxjs/operators';
import { UserService } from '../../../@core/data/users.service';
import { IUser } from '../@interfaces';
import { IUser as IUserState } from '../../../@core/store/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPasswordValidator } from '../../../@core/validators/MatchPasswordValidator';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { ActivatedRoute, Router } from '@angular/router';
import { of as observableOf } from 'rxjs';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent implements OnInit {
  public user: IUser;
  public profileEditorForm: FormGroup;
  public formSubmitted: boolean;
  public config: ToasterConfig;

  constructor(private store: Store<IAppState>,
              private usersService: UserService,
              private toasterService: ToasterService,
              private router: Router,
              private route: ActivatedRoute) {
    this.profileEditorForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.minLength(6)]),
      confirmNewPassword: new FormControl(''),
      currentPassword: new FormControl('', [Validators.required]),
    }, [
      MatchPasswordValidator('newPassword', 'confirmNewPassword'),
    ]);
    this.config = new ToasterConfig({
      positionClass: 'toast-center',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'slideUp',
      limit: 2,
    });
    this.formSubmitted = false;
  }

  ngOnInit() {
    this.store.pipe(
      select(getId),
      switchMap(id => {
        return this.usersService.getUserById(id);
      }),
    ).subscribe(response => {
      this.user = <IUser>response;
      this.profileEditorForm.controls['fullName'].setValue(this.user.fullname);
      this.profileEditorForm.controls['email'].setValue(this.user.email);
    });
  }

  get editorForm(): any {
    return this.profileEditorForm.controls;
  }

  onSaveNewProfile() {
    this.formSubmitted = true;

    if (!this.profileEditorForm.valid) {
      return;
    }

    this.store.pipe(
      select(getId),
      switchMap(id => {
        const newUserData = this.profileEditorForm.value;

        let castedNewUserData: any = {
          email: newUserData.email,
          fullname: newUserData.fullName,
          password: newUserData.currentPassword,
        };

        if (newUserData.newPassword !== '') {
          castedNewUserData = {
            ...castedNewUserData,
            new_password: newUserData.newPassword,
          };
        }

        return this.usersService.onUpdateUser(id, castedNewUserData);
      }),
      switchMap(response => {
        const toast: Toast = {
          type: 'default',
          title: 'Mensaje',
          body: response['message'],
          timeout: 5000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);

        const newUserData: IUserState = {
          ...<IUserState>response['user_updated'],
          full_name: response['user_updated'].fullname,
        };
        this.store.dispatch(new LoadUserData(newUserData));

        return observableOf({
          succeeded: true,
        });
      }),
      delay(1500),
    ).subscribe(obj => {
      if (obj.succeeded) {
        this.router.navigate(['../my-profile'], {
          relativeTo: this.route,
        });
      }
    }, exception => {
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        body: exception.error['error'],
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
    });
  }
}
