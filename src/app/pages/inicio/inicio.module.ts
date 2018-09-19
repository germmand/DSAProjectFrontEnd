import { NgModule } from '@angular/core';
import { InicioComponent } from './inicio.component';

import { ThemeModule } from '../../@theme/theme.module';
import { DescriptorCardComponent } from './descriptor-card/descriptor-card.component';
import StatesCardComponent from './states-card/states-card.component';
import StatesCardBackComponent from './states-card/back-side/states-card-back.component';
import StatesCardFrontComponent from './states-card/front-side/states-card-front.component';

const COMPONENTS = [
  InicioComponent,
  DescriptorCardComponent,
  StatesCardComponent,
  StatesCardBackComponent,
  StatesCardFrontComponent,
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
