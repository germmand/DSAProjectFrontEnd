import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-states-card',
  templateUrl: './states-card.component.html',
  styleUrls: ['./states-card.component.scss'],
})
export default class StatesCardComponent {
  @Input() type: string;
  @Input() title: string;
  @Input() iconClassFront: string;
  @Input() iconClassBack: string;
  @Input() backText: string;
  @Input() quantity: number;

  public flipped: boolean;

  constructor() {
    this.flipped = false;
  }

  onToggleFlip() {
    this.flipped = !this.flipped;
  }
}
