import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../@core/store/app.reducer';
import {getAccessToken} from '../@core/store/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS;

  constructor(private store: Store<IAppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.store.pipe(select(getAccessToken))
      .subscribe(access_token => {
        if (access_token === '') {
          this.router.navigate(['/auth/login']);
        }
      });
  }
}
