import { AfterViewInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../@core/store/app.reducer';
import { Router } from '@angular/router';
import { WipeUserData } from '../../../@core/store/user';
import { SignOut } from '../../../@core/store/auth';
import { throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../@core/data/auth.service';

@Component({
  selector: 'ngx-logout',
  template: `
    <p>Cerrando sesión, por favor espere...</p>
  `,
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements AfterViewInit {
  constructor(private store: Store<IAppState>,
              private router: Router,
              private authService: AuthService) {
  }

  ngAfterViewInit(): void {
    this.authService.onLogoutAccess().pipe(
      switchMap(access_response => {
        return this.authService.onLogoutRefresh();
      }),
      catchError(error => {
        return throwError(error);
      }),
    ).subscribe(refresh_response => {
      // Cleaning up the user's data from the app's state.
      this.store.dispatch(new WipeUserData());

      // Then we proceed to delete the tokens.
      this.store.dispatch(new SignOut());

      // Finally, we redirect the user to the login page.
      this.router.navigate(['/auth/login']);
    });
  }
}
