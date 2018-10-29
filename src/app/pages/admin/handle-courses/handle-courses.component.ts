import { Component } from '@angular/core';
import { IArea } from './@interfaces';

@Component({
  selector: 'ngx-handle-courses',
  templateUrl: './handle-courses.component.html',
  styleUrls: ['./handle-courses.component.scss'],
})
export class HandleCoursesComponent {
  constructor() {
  }

  onNewAreaAdded(newArea: IArea) {
  }
}
