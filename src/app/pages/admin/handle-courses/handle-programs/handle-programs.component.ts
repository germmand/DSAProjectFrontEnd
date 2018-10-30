import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { IArea } from '../@interfaces';
import { AreasService } from '../../../../@core/data/areas.service';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

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
  public config: ToasterConfig;

  @Input() areas: IArea[];

  constructor(private areasService: AreasService,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.newCoursesForm = new FormGroup({
      area_id: new FormControl('', [Validators.required]),
      area_programs: new FormArray([]),
    });
    this.programsSubmitted = false;
    this.config = new ToasterConfig({
      positionClass: 'toast-center',
      timeout: 5000,
      newestOnTop: true,
      tapToDismiss: true,
      preventDuplicates: true,
      animation: 'slideUp',
      limit: 2,
    });
  }

  onAddingProgram() {
    this.coursesForm.area_programs.push(this.onCreateNewProgram());
  }

  onAddingNewPrograms() {
    this.programsSubmitted = true;
    if (!this.newCoursesForm.valid) {
      return;
    }

    const newProgramsData: any = this.newCoursesForm.value;
    this.areasService
      .onAppendProgramsToArea(newProgramsData)
      .subscribe(response => {
        const toast: Toast = {
          type: 'default',
          title: 'Mensaje',
          body: response['message'],
          timeout: 5000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
        this.programsSubmitted = false;
        this.newCoursesForm = new FormGroup({
          area_id: new FormControl('', [Validators.required]),
          area_programs: new FormArray([]),
        });
      }, exception => {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          body: exception.error['error'],
          timeout: 5000,
          showCloseButton: true,
          bodyOutputType: BodyOutputType.TrustedHtml,
        };
        this.toasterService.popAsync(toast);
      });
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
