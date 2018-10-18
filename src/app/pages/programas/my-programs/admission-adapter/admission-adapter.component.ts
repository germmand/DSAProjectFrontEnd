import { Component, Input } from '@angular/core';
import { IAdmission } from '../IAdmission';

@Component({
  selector: 'ngx-admission-adapter',
  templateUrl: './admission-adapter.component.html',
  styleUrls: ['./admission-adapter.component.scss'],
})
export class AdmissionAdapterComponent {
  @Input() admissions: IAdmission[];

  constructor() {
  }
}
