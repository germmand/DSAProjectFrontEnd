import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { IArea } from '../@interfaces';

@Component({
  selector: 'ngx-handle-programs',
  templateUrl: './handle-programs.component.html',
  styleUrls: ['./handle-programs.component.scss'],
})
export class HandleProgramsComponent implements OnInit {
  public newCoursesForm: FormGroup;
  public programTypes: string[] = ['Semestral', 'Modular'];
  public programDegrees: string[] = ['Maestría', 'Doctorado', 'Especialización'];
  public programsSubmitted: boolean;

  @Input() areas: IArea[];

  constructor() {
  }

  ngOnInit() {
    this.newCoursesForm = new FormGroup({
      area_id: new FormControl('', [Validators.required]),
      area_programs: new FormArray([]),
    });
    this.programsSubmitted = false;
  }

  onAddingProgram() {
    this.coursesForm.area_programs.push(this.onCreateNewProgram());
  }

  onAddingNewPrograms() {
    this.programsSubmitted = true;
  }

  onAppendSubject(program: FormGroup) {
    (<FormArray>program.controls.program_subjects).push(this.onCreateNewSubject());
  }

  onCreateNewProgram(): FormGroup {
    return new FormGroup({
      program_name: new FormControl('', [Validators.required]),
      program_type: new FormControl('', [Validators.required]),
      degree_type: new FormControl('', [Validators.required]),
      program_subjects: new FormArray([]),
    });
  }

  onCreateNewSubject(): FormGroup {
    return new FormGroup({
      subject_name: new FormControl('', [Validators.required]),
      credits: new FormControl('', [Validators.required]),
      semester: new FormControl(''),
      hours: new FormControl('', [Validators.required]),
      weeks: new FormControl('', [Validators.required]),
    });
  }

  get coursesForm(): any {
    return this.newCoursesForm.controls;
  }
}
