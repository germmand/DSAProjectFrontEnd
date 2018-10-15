import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProgramsService } from '../../../@core/data/programs.service';
import { AdmissionsService } from '../../../@core/data/admissions.service';
import { IAppState } from '../../../@core/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { getId } from '../../../@core/store/user';

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
  private user_id: string;

  constructor(private route: ActivatedRoute,
              private programService: ProgramsService,
              private admissionsService: AdmissionsService,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
          return paramMap.get('id');
      }),
      switchMap(id => {
        return this.programService.onGetProgram(id);
      }),
    ).subscribe(response => {
      this.program = response['program'];
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
        return paramMap.get('id');
      }),
      switchMap(program_id => {
        return this.admissionsService.onCreateAdmission(Number(program_id), this.user_id);
      })
    ).subscribe(response => {
      console.log(response);
    });
  }
}
