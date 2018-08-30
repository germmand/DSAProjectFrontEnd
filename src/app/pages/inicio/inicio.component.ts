import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../../@core/store/app.reducer';
import * as auth from '../../@core/store/auth';

@Component({
  selector: 'ngx-inicio',
  styleUrls: ['./inicio.component.scss'],
  templateUrl: './inicio.component.html',
})
export class InicioComponent implements OnInit {
  constructor(private store: Store<IAppState>) {
  }
  ngOnInit(): void {
    this.store.dispatch(new auth.SignIn({
      access_token: 'hey',
      refresh_token: 'hey2',
    }));
  }

  onClickedButton(): void {
      this.store.pipe(select('auth'))
        .subscribe(data => {
          alert('Access: ' + data.access_token + '\nRefresh: ' + data.refresh_token);
        });

      this.store.pipe(select(auth.getAccessToken))
        .subscribe(access_token => {
          alert('Access: ' + access_token);
        });

      this.store.pipe(select(auth.getRefreshToken))
        .subscribe(refresh_token => {
          alert('Refresh: ' + refresh_token);
        });
  }
}
