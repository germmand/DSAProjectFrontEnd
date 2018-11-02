import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { StateService } from './state.service';
import { LayoutService } from './layout.service';
import { AdmissionsService } from './admissions.service';
import { AreasService } from './areas.service';
import { AuthService } from './auth.service';
import { ProgramsService } from './programs.service';
import { RolesService } from './roles.service';
import { SubjectsService } from './subjects.service';

const SERVICES = [
  UserService,
  StateService,
  LayoutService,
  AdmissionsService,
  AreasService,
  AuthService,
  ProgramsService,
  RolesService,
  SubjectsService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
