import { Component, OnInit } from '@angular/core';
import { IArea } from './@interfaces';
import { AreasService } from '../../../@core/data/areas.service';

@Component({
  selector: 'ngx-handle-courses',
  templateUrl: './handle-courses.component.html',
  styleUrls: ['./handle-courses.component.scss'],
})
export class HandleCoursesComponent implements OnInit {
  public areas: IArea[];

  constructor(private areasService: AreasService) {
  }

  ngOnInit() {
    this.areasService
      .onGetAllAreas()
      .subscribe(response => {
        this.areas = <IArea[]>response['areas'];
      });
  }

  onNewAreaAdded(newArea: IArea) {
    this.areas.push(newArea);
  }
}
