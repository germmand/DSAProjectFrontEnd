import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { IAdmission } from '../../@interfaces/IAdmission';

@Component({
  selector: 'ngx-admission-adapter',
  templateUrl: './admission-adapter.component.html',
  styleUrls: ['./admission-adapter.component.scss'],
})
export class AdmissionAdapterComponent implements OnInit {
  @Input() admissions: IAdmission[];
  @Input() hasFooter: boolean;
  @Output() onAdmissionClicked: EventEmitter<IAdmission> = new EventEmitter<IAdmission>();

  constructor() {
  }

  ngOnInit() {
    this.hasFooter = this.hasFooter !== undefined;
  }

  onInspectActionClicked(admission: IAdmission) {
    this.onAdmissionClicked.emit(admission);
  }
}
