import { NgModule } from '@angular/core';
import { ProgramasRoutingModule } from './programas-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ProgramasComponent } from './programas.component';
import { AreasComponent } from './areas/areas.component';
import { AreasService } from '../../@core/data/areas.service';
import { ProgramaComponent } from './programa/programa.component';
import { ProgramsService } from '../../@core/data/programs.service';
import { ToasterModule } from 'angular2-toaster';
import { MyProgramsComponent } from './my-programs/my-programs.component';
import { AdmissionAdapterComponent } from './my-programs/admission-adapter/admission-adapter.component';
import { MyAdmissionComponent } from './my-admission/my-admission.component';
import { SubjectsService } from '../../@core/data/subjects.service';
import { AdmissionSummaryComponent } from './admission-summary/admission-summary.component';
import { SummaryAdapterComponent } from './admission-summary/summary-adapter/summary-adapter.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TokenInterceptor } from '../../@core/interceptors/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const PROGRAMAS_COMPONENTS = [
  ProgramasComponent,
  AreasComponent,
  ProgramaComponent,
  MyProgramsComponent,
  AdmissionAdapterComponent,
  MyAdmissionComponent,
  AdmissionSummaryComponent,
  SummaryAdapterComponent,
];

const PROGRAMAS_PROVIDERS = [
  AreasService,
  ProgramsService,
  SubjectsService,
  // The reason why we need to re-import the interceptor here is because
  // somehow Ng2SmartTableModule invalidate the interceptor provided on CoreModule.
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
];


@NgModule({
  imports: [
    ProgramasRoutingModule,
    ThemeModule,
    ToasterModule.forRoot(),
    Ng2SmartTableModule,
  ],
  declarations: [
    ...PROGRAMAS_COMPONENTS,
  ],
  providers: [
    ...PROGRAMAS_PROVIDERS,
  ],
})
export class ProgramasModule {
}
