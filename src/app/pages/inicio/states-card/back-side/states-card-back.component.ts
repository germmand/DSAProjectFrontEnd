import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-states-card-back',
  templateUrl: './states-card-back.component.html',
  styleUrls: ['./states-card-back.component.scss'],
})
export default class StatesCardBackComponent {
  @Input() type: string;
  @Input() backText: string;

  constructor() {

  }
}
