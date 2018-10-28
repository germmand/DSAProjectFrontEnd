import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { ProfileComponent } from './my-profile/profile.component';
import { ProfileEditorComponent } from './my-profile-editor/profile-editor.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  children: [{
    path: 'my-profile',
    component: ProfileComponent,
  }, {
    path: 'profile-editor',
    component: ProfileEditorComponent,
  }, {
    path: '',
    redirectTo: 'my-profile',
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
export class UserRoutingModule {
  constructor() {
  }
}
