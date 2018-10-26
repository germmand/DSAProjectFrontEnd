import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SubjectsService } from '../../../@core/data/subjects.service';
import { ISubjectSummary } from '../@interfaces';

@Component({
  selector: 'ngx-admission-summary',
  templateUrl: './admission-summary.component.html',
  styleUrls: ['./admission-summary.component.scss'],
})
export class AdmissionSummaryComponent implements OnInit {
  public takenSubjects: ISubjectSummary[];
  public takingSubjects: ISubjectSummary[];
  public willtakeSubjects: ISubjectSummary[];

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
      this.takenSubjects = response['taken_subjects'];
      this.takingSubjects = response['taking_subjects'];
      this.willtakeSubjects = response['willtake_subjects'];
    });
  }
}
