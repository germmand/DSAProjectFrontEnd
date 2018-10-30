import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProgramsService } from '../../../@core/data/programs.service';
import { AdmissionsService } from '../../../@core/data/admissions.service';
import { IAppState } from '../../../@core/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getId } from '../../../@core/store/user';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

interface ISubject {
  id: number;
  name: string;
  subject_semester: number;
  credits: number;
  weeks: number;
  hours_per_week: number;
}

interface IProgram {
  area_id: number;
  area_name: string;
  program_id: number;
  program_name: number;
  degree_type: string;
  type_name: string;
  subjects: ISubject[];
}

@Component({
  selector: 'ngx-graduate-program',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss'],
})
export class ProgramaComponent implements OnInit {
  public program: IProgram;
  public config: ToasterConfig;
  private user_id: string;

  constructor(private route: ActivatedRoute,
              private programService: ProgramsService,
              private admissionsService: AdmissionsService,
              private store: Store<IAppState>,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
          return this.programService.onGetProgram(paramMap.get('id'));
      }),
    ).subscribe(response => {
      this.program = response['program'];
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

  OnCreateAdmission() {
    this.store.pipe(
      select(getId),
      switchMap(id => {
        this.user_id = id;
        return this.route.paramMap;
      }),
      switchMap((paramMap: ParamMap) => {
        return this.admissionsService.onCreateAdmission(Number(paramMap.get('id')), this.user_id);
      }),
    ).subscribe(response => {
      const toast: Toast = {
        type: 'default',
        title: 'Mensaje',
        body: response['message'],
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };

      this.toasterService.popAsync(toast);
    }, exception => {
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        body: exception.error['error'],
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };

      this.toasterService.popAsync(toast);
    });
  }
}
