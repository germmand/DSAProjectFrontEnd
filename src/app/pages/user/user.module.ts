import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './my-profile/profile.component';
import { ProfileEditorComponent } from './my-profile-editor/profile-editor.component';
import { ToasterModule } from 'angular2-toaster';

const USER_COMPONENTS = [
  UserComponent,
  ProfileComponent,
  ProfileEditorComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    ...USER_COMPONENTS,
  ],
})
export class UserModule {
  constructor() {
  }
}
