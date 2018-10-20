import { Component } from '@angular/core';

@Component({
  selector: 'ngx-admin-panel',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AdminComponent {
  constructor() {
  }
}
