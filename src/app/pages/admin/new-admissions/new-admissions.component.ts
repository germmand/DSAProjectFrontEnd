import { Component, OnInit } from '@angular/core';
import { AdmissionsService } from '../../../@core/data/admissions.service';

interface IAdmission {
  id: string;
  admission_id: number;
  email: string;
  fullname: string;
  role: string;
  area: string;
  program_name: string;
  current_semester: number;
  type: string;
  status: string;
}

@Component({
  selector: 'ngx-new-admissions',
  templateUrl: './new-admissions.component.html',
  styleUrls: ['./new-admissions.component.scss'],
})
export class NewAdmissionsComponent implements OnInit {
  public admissions: IAdmission[];

  constructor(private admissionsService: AdmissionsService) {
  }

  ngOnInit() {
    this.admissionsService
      .onGetNewAdmissions()
      .subscribe(response => {
        this.admissions = response['admissions'];
      });
  }
}
