import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@core/data/users.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../@core/store/app.reducer';
import { getId } from '../../../@core/store/user';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

interface IUser {
  id: string;
  email: string;
  fullname: string;
  role: string;
}

@Component({
  selector: 'ngx-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user: IUser;

  constructor(private usersService: UserService,
              private store: Store<IAppState>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.store.pipe(
      select(getId),
      switchMap(id => {
        return this.usersService.getUserById(id);
      }),
    ).subscribe(response => {
      this.user = <IUser>response;
    });
  }

  onProceedEditing() {
    this.router.navigate(['../profile-editor'], {
      relativeTo: this.route,
    });
  }
}
