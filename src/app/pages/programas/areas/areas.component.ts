import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../../@core/data/areas.service';
import * as _ from 'lodash';

export interface IAreaProgram {
 areaId: number;
 programId: number;
 programName: string;
 programType: string;
}

export interface IArea {
  areaId: number;
  areaName: string;
  areaPrograms: IAreaProgram[];
}

@Component({
  selector: 'ngx-programs-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss'],
})
export class AreasComponent implements OnInit {
  private areas: IArea[];
  private areasGrid: any[]; // Areas' array in chunks of two for bootstrap's grid system.

  constructor(private areasService: AreasService) {
    this.areas = [];
    this.areasGrid = [];
  }

  ngOnInit() {
    this.areasService
      .onGetAllAreas()
      .subscribe(response => {
        for (const area of response['areas']) {
          this.areas.push({
           areaId: area['area_id'],
            areaName: area['area_name'],
            areaPrograms: area['area_programs'].map(program => {
              return {
                areaId: program['area_id'],
                programId: program['program_id'],
                programName: program['program_name'],
                programType: program['type_name'],
              };
            }),
          });
        }

        this.areasGrid = _.chunk(this.areas, 2);
      });
  }
}
