import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NewAdmissionsComponent } from './new-admissions/new-admissions.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [{
    path: 'new-admissions',
    component: NewAdmissionsComponent,
  }, {
    path: '',
    redirectTo: 'new-admissions',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AdminRoutingModule {
}
