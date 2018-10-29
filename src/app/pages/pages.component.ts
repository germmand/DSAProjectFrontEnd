import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {select, Store} from '@ngrx/store';
import {IAppState} from '../@core/store/app.reducer';
import {getAccessToken} from '../@core/store/auth';
import {Router} from '@angular/router';
import { getRole } from '../@core/store/user';
import * as _ from 'lodash';

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
    this.store.pipe(
      select(getRole),
    ).subscribe(role => {
      const alreadyAdded = _.findIndex(this.menu, m => m.title === 'PANEL DE ADMINISTRADOR') !== -1;
      if (role === 'Administrador' && !alreadyAdded) {
        this.menu.push({
          title: 'PANEL DE ADMINISTRADOR',
          group: true,
          type: 'Administrador',
        }, {
          title: 'Nuevas Admisiones',
          icon: 'nb-compose',
          link: '/pages/admin/new-admissions',
          type: 'Administrador',
        }, {
          title: 'Manejar Cursos',
          icon: 'nb-gear',
          link: '/pages/admin/handle-courses',
          type: 'Administrador',
        });
      } else if (role !== 'Administrador' && alreadyAdded) {
        _.remove(this.menu, m => m.type === 'Administrador');
      }
    });

    this.store.pipe(select(getAccessToken))
      .subscribe(access_token => {
        if (access_token === '') {
          this.router.navigate(['/auth/login']);
        }
      });
  }
}
