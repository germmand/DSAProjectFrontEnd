import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramasComponent } from './programas.component';
import { AreasComponent } from './areas/areas.component';

const routes: Routes = [{
  path: '',
  component: ProgramasComponent,
  children: [{
    path: 'areas',
    component: AreasComponent,
  }, {
    path: '',
    redirectTo: 'areas',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramasRoutingModule {
}
