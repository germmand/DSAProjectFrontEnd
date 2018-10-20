import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NewAdmissionsComponent } from './new-admissions/new-admissions.component';

const ADMIN_COMPONENTS = [
  AdminComponent,
  NewAdmissionsComponent,
];

@NgModule({
  imports: [ThemeModule, AdminRoutingModule],
  declarations: [...ADMIN_COMPONENTS],
})
export class AdminModule {
}
