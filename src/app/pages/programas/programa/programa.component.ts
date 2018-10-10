import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of as observableOf } from 'rxjs';
import { ProgramsService } from '../../../@core/data/programs.service';

@Component({
  selector: 'ngx-graduate-program',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss'],
})
export class ProgramaComponent implements OnInit {
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
      // console.log(response);
    }, error => {
      // console.log(error);
    });
  }
}
