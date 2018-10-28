import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './my-profile/profile.component';

const USER_COMPONENTS = [
  UserComponent,
  ProfileComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    UserRoutingModule,
  ],
  declarations: [
    ...USER_COMPONENTS,
  ],
})
export class UserModule {
  constructor() {
  }
}
