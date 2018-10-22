import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NewAdmissionsComponent } from './new-admissions/new-admissions.component';
import { ToasterModule } from 'angular2-toaster';

const ADMIN_COMPONENTS = [
  AdminComponent,
  NewAdmissionsComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AdminRoutingModule,
    ToasterModule.forRoot(),
  ],
  declarations: [...ADMIN_COMPONENTS],
})
export class AdminModule {
}
