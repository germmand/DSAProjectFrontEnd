import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';

import { ThemeModule } from '../../@theme/theme.module';

const COMPONENTS = [
  InicioComponent,
];

@NgModule({
  imports: [
    ThemeModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class InicioModule {
}
