import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../@core/store/app.reducer';
import { getId } from '../../../@core/store/user';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../../@core/data/users.service';
import { IUser } from '../@interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPasswordValidator } from '../../../@core/validators/MatchPasswordValidator';

@Component({
  selector: 'ngx-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss'],
})
export class ProfileEditorComponent implements OnInit {
  public user: IUser;
  public profileEditorForm: FormGroup;
  public formSubmitted: boolean;

  constructor(private store: Store<IAppState>,
              private usersService: UserService) {
    this.profileEditorForm = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.minLength(6)]),
      confirmNewPassword: new FormControl(''),
      currentPassword: new FormControl('', [Validators.required]),
    }, [
      MatchPasswordValidator('newPassword', 'confirmNewPassword'),
    ]);
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

    if (this.profileEditorForm.valid) {
      return;
    }
  }
}
