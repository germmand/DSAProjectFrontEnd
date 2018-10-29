import { Component, OnInit } from '@angular/core';
import { AreasService } from '../../../../@core/data/areas.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IArea } from '../@interfaces';

@Component({
  selector: 'ngx-handle-programs',
  templateUrl: './handle-programs.component.html',
  styleUrls: ['./handle-programs.component.scss'],
})
export class HandleProgramsComponent implements OnInit {
  public newCoursesForm: FormGroup;
  public areas: IArea[];

  constructor(private areasService: AreasService) {
  }

  ngOnInit() {
    this.newCoursesForm = new FormGroup({
      area_id: new FormControl('', [Validators.required]),
    });

    this.areasService
      .onGetAllAreas()
      .subscribe(response => {
        this.areas = <IArea[]>response['areas'];
      });
  }

  onAddingProgram() {
  }

  onAddingNewPrograms() {
  }

  get coursesForm(): any {
    return this.newCoursesForm.controls;
  }
}
