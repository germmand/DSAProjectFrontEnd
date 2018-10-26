import { Component, Input } from '@angular/core';
import { ISubjectSummary } from '../../@interfaces';

@Component({
  selector: 'ngx-summary-adapter',
  templateUrl: './summary-adapter.component.html',
  styleUrls: ['./summary-adapter.component.scss'],
})
export class SummaryAdapterComponent {
  @Input() public subjects: ISubjectSummary[];

  constructor() {
  }
}
