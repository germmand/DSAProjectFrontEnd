import {AfterViewInit, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {IAppState} from '../../../@core/store/app.reducer';
import {Router} from '@angular/router';
import {WipeUserData} from '../../../@core/store/user';
import {SignOut} from '../../../@core/store/auth';
import {of as observableOf} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'ngx-logout',
  template: `
    <p>Cerrando sesión, por favor espere...</p>
  `,
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements AfterViewInit {
  constructor(private store: Store<IAppState>,
              private router: Router) {
  }

  ngAfterViewInit(): void {
    observableOf(null)
      .pipe(delay(500))
      .subscribe(value => {
        // Cleaning up the user's data from the app's state.
        this.store.dispatch(new WipeUserData());

        // Then we proceed to delete the tokens.
        this.store.dispatch(new SignOut());

        // Finally, we redirect the user to the login page.
        this.router.navigate(['/auth/login']);
      });
  }
}
