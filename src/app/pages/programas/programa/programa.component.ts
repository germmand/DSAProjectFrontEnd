import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProgramsService } from '../../../@core/data/programs.service';

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

  constructor(private route: ActivatedRoute,
              private programService: ProgramsService) {
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
  }
}
