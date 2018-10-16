import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramasComponent } from './programas.component';
import { AreasComponent } from './areas/areas.component';
import { ProgramaComponent } from './programa/programa.component';
import { MyProgramsComponent } from './my-programs/my-programs.component';

const routes: Routes = [{
  path: '',
  component: ProgramasComponent,
  children: [{
    path: 'areas',
    component: AreasComponent,
  }, {
    path: 'programa/:id',
    component: ProgramaComponent,
  }, {
    path: 'my-programs',
    component: MyProgramsComponent,
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
