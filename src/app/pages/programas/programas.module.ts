import { NgModule } from '@angular/core';
import { ProgramasRoutingModule } from './programas-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ProgramasComponent } from './programas.component';
import { AreasComponent } from './areas/areas.component';
import { AreasService } from '../../@core/data/areas.service';

const PROGRAMAS_COMPONENTS = [
  ProgramasComponent,
  AreasComponent,
];

const PROGRAMAS_PROVIDERS = [
  AreasService,
];


@NgModule({
  imports: [
    ProgramasRoutingModule,
    ThemeModule,
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
