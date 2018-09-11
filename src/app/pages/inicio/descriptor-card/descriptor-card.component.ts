import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-descriptor-card',
  templateUrl: './descriptor-card.component.html',
  styleUrls: ['./descriptor-card.component.scss'],
})
export class DescriptorCardComponent {
  constructor() {
  }

  @Input('title') title: string;
  @Input('description') description: string;
  @Input('image') image: string;
}
