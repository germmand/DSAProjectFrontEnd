import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-states-card-front',
  templateUrl: './states-card-front.component.html',
  styleUrls: ['./states-card-front.component.scss'],
})
export default class StatesCardFrontComponent {
  @Input() type: string;
  @Input() title: string;
  @Input() quantity: number;

  constructor() {

  }
}
