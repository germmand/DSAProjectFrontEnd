import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SubjectsService } from '../../../@core/data/subjects.service';

interface ISubject {
  id: number;
  name: string;
  subject_semester: number;
  credits: number;
  hours_per_week: number;
  weeks: number;
}

@Component({
  selector: 'ngx-my-admission',
  templateUrl: './my-admission.component.html',
  styleUrls: ['./my-admission.component.scss'],
})
export class MyAdmissionComponent implements OnInit {
  public subjectsToSignup: ISubject[];
  public subjectsSignedUp: ISubject[];

  constructor(private route: ActivatedRoute,
              private subjectsService: SubjectsService) {
    this.subjectsSignedUp = [];
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        return paramMap.get('id');
      }),
      switchMap(id => {
        return this.subjectsService.onGetSubjecsToSignup(id);
      }),
    ).subscribe(response => {
      this.subjectsToSignup = response['subjects'];
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

  }

  onProceeding(): void {

  }
}
