import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NewAdmissionsComponent } from './new-admissions/new-admissions.component';
import { ToasterModule } from 'angular2-toaster';
import { HandleCoursesComponent } from './handle-courses/handle-courses.component';
import { CreateAreaComponent } from './handle-courses/create-area/create-area.component';
import { HandleProgramsComponent } from './handle-courses/handle-programs/handle-programs.component';

const ADMIN_COMPONENTS = [
  AdminComponent,
  NewAdmissionsComponent,
  HandleCoursesComponent,
  CreateAreaComponent,
  HandleProgramsComponent,
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
