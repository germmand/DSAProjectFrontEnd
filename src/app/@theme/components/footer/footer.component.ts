import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Aplicación creada para asignación de DSA - 2018</span>
    <div class="socials">
      <i class="fa fa-smile-wink"></i>
    </div>
  `,
})
export class FooterComponent {
}
