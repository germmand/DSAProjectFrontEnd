import { Component, OnInit } from '@angular/core';
import { AdmissionsService } from '../../../@core/data/admissions.service';
import { IAppState } from '../../../@core/store/app.reducer';
import { Store, select } from '@ngrx/store';
import { getId } from '../../../@core/store/user';
import { switchMap } from 'rxjs/operators';
import { IAdmission } from './IAdmission';

@Component({
  selector: 'ngx-my-programs',
  templateUrl: './my-programs.component.html',
  styleUrls: ['./my-programs.component.scss'],
})
export class MyProgramsComponent implements OnInit {
  public accepted_admissions: IAdmission[];
  public declined_admissions: IAdmission[];
  public review_admissions: IAdmission[];

  constructor(private admissionsService: AdmissionsService,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.store.pipe(
      select(getId),
      switchMap(id => {
        return this.admissionsService.onGetMyAdmissions(id);
      }),
    ).subscribe(response => {
      this.accepted_admissions = response['admissions'].filter(a => a.status === 'Aceptada');
      this.declined_admissions = response['admissions'].filter(a => a.status === 'Declinada');
      this.review_admissions = response['admissions'].filter(a => a.status === 'En revisión');
    }, exception => {
      alert(exception.error['error']);
    });
  }
}
