import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { InicioModule } from './inicio/inicio.module';
import { AdmissionsService } from '../@core/data/admissions.service';

const PAGES_COMPONENTS = [
  PagesComponent,
];

const PAGES_PROVIDERS = [
  AdmissionsService,
];


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    InicioModule,
    MiscellaneousModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    ...PAGES_PROVIDERS,
  ],
})
export class PagesModule {
}
