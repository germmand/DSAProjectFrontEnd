import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IArea } from '../@interfaces';

@Component({
  selector: 'ngx-handle-programs',
  templateUrl: './handle-programs.component.html',
  styleUrls: ['./handle-programs.component.scss'],
})
export class HandleProgramsComponent implements OnInit {
  public newCoursesForm: FormGroup;
  @Input() areas: IArea[];

  constructor() {
  }

  ngOnInit() {
    this.newCoursesForm = new FormGroup({
      area_id: new FormControl('', [Validators.required]),
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
