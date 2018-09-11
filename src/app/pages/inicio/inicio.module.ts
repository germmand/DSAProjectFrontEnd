import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';

import { ThemeModule } from '../../@theme/theme.module';
import { DescriptorCardComponent } from './descriptor-card/descriptor-card.component';

const COMPONENTS = [
  InicioComponent,
  DescriptorCardComponent,
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
