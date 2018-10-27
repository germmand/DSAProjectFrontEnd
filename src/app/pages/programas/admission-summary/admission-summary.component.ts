import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SubjectsService } from '../../../@core/data/subjects.service';
import {ISubject, ISubjectSummary} from '../@interfaces';

@Component({
  selector: 'ngx-admission-summary',
  templateUrl: './admission-summary.component.html',
  styleUrls: ['./admission-summary.component.scss'],
})
export class AdmissionSummaryComponent implements OnInit {
  public takenSubjects: ISubject[];
  public takingSubjects: ISubject[];
  public willtakeSubjects: ISubject[];

  constructor(private route: ActivatedRoute,
              private subjectsService: SubjectsService) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        return paramMap.get('id');
      }),
      switchMap(id => {
        return this.subjectsService.onGetAllSubjects(id);
      }),
    ).subscribe(response => {
      this.takenSubjects = (<ISubjectSummary[]>response['taken_subjects']).map(s => s.subject);
      this.takingSubjects = (<ISubjectSummary[]>response['taking_subjects']).map(s => s.subject);
      this.willtakeSubjects = (<ISubjectSummary[]>response['willtake_subjects']).map(s => s.subject);
    });
  }
}
