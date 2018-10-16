import { NgModule } from '@angular/core';
import { ProgramasRoutingModule } from './programas-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ProgramasComponent } from './programas.component';
import { AreasComponent } from './areas/areas.component';
import { AreasService } from '../../@core/data/areas.service';
import { ProgramaComponent } from './programa/programa.component';
import { ProgramsService } from '../../@core/data/programs.service';
import { ToasterModule } from 'angular2-toaster';

const PROGRAMAS_COMPONENTS = [
  ProgramasComponent,
  AreasComponent,
  ProgramaComponent,
];

const PROGRAMAS_PROVIDERS = [
  AreasService,
  ProgramsService,
];


@NgModule({
  imports: [
    ProgramasRoutingModule,
    ThemeModule,
    ToasterModule.forRoot(),
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
