import { Component, OnInit } from '@angular/core';
import { AdmissionsService } from '../../../@core/data/admissions.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import 'style-loader!angular2-toaster/toaster.css';

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
  public config: ToasterConfig;

  constructor(private admissionsService: AdmissionsService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.admissionsService
      .onGetNewAdmissions()
      .subscribe(response => {
        this.admissions = response['admissions'];
      });

    this.config = new ToasterConfig({
      positionClass: 'toast-center',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'slideUp',
      limit: 2,
    });
  }

  onAcceptOrDeclineAdmission(admission_id: number, status_name: string) {
    this.admissionsService
      .onAcceptOrDeclineAdmission(admission_id, status_name)
      .pipe(
        switchMap(response => {
          const toast: Toast = {
            type: 'default',
            title: 'Mensaje',
            body: response['message'],
            timeout: 5000,
            showCloseButton: true,
            bodyOutputType: BodyOutputType.TrustedHtml,
          };
          this.toasterService.popAsync(toast);

          return this.admissionsService.onGetNewAdmissions();
        }),
        catchError(exception => {
          const toast: Toast = {
            type: 'error',
            title: 'Error',
            body: exception.error['error'],
            timeout: 5000,
            showCloseButton: true,
            bodyOutputType: BodyOutputType.TrustedHtml,
          };
          this.toasterService.popAsync(toast);

          return throwError(exception);
        }),
      ).subscribe(response => {
        this.admissions = response['admissions'];
      });
  }
}
