import { NgModule } from '@angular/core';
import { ProgramasRoutingModule } from './programas-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ProgramasComponent } from './programas.component';
import { AreasComponent } from './areas/areas.component';

const PROGRAMAS_COMPONENTS = [
  ProgramasComponent,
  AreasComponent,
];

@NgModule({
  imports: [
    ProgramasRoutingModule,
    ThemeModule,
  ],
  declarations: [
    ...PROGRAMAS_COMPONENTS,
  ],
})
export class ProgramasModule {

}
