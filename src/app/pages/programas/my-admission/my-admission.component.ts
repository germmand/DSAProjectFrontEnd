import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { SubjectsService } from '../../../@core/data/subjects.service';
import { ISubject } from '../@interfaces';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { AdmissionsService } from '../../../@core/data/admissions.service';
import { throwError } from 'rxjs';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-my-admission',
  templateUrl: './my-admission.component.html',
  styleUrls: ['./my-admission.component.scss'],
})
export class MyAdmissionComponent implements OnInit {
  public subjectsToSignup: ISubject[];
  public subjectsSignedUp: ISubject[];
  public config: ToasterConfig;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private subjectsService: SubjectsService,
              private toasterService: ToasterService,
              private admissionsService: AdmissionsService) {
    this.subjectsSignedUp = [];
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        return this.subjectsService.onGetSubjecsToSignup(paramMap.get('id'));
      }),
    ).subscribe(response => {
      this.subjectsToSignup = response['subjects'];
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

  onSignupSubject(subject: ISubject) {
    if (window.confirm(`¿Seguro que quiere inscribir '${subject.name}'`)) {
      this.subjectsToSignup = this.subjectsToSignup.filter(s => s.id !== subject.id);
      this.subjectsSignedUp.push(subject);
    }
  }

  onRemoveSubject(subject: ISubject) {
    if (window.confirm(`¿Seguro que quiere remover '${subject.name}'`)) {
      this.subjectsSignedUp = this.subjectsSignedUp.filter(s => s.id !== subject.id);
      this.subjectsToSignup.push(subject);
    }
  }

  onSummary(): void {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        this.router.navigate(['../../admission-summary', paramMap.get('id')],
                     { relativeTo: this.route });
    });
  }

  onProceeding(): void {
    if (this.subjectsSignedUp.length === 0) {
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        body: 'No ha seleccionado ninguna materia.',
        timeout: 5000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
      return;
    }

    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        return this.admissionsService.onUpdateSubjects(Number(paramMap.get('id')), this.subjectsSignedUp, 'Cursando');
      }),
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
        this.subjectsSignedUp = [];
        return this.route.paramMap;
      }),
      catchError(error => {
        return throwError(error);
      }),
      switchMap(paramMap => {
        return this.subjectsService.onGetSubjecsToSignup(paramMap.get('id'));
      }),
    ).subscribe(response => {
      this.subjectsToSignup = response['subjects'];
    });
  }
}
