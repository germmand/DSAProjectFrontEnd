import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { HttpClientModule } from '@angular/common/http';
import { of as observableOf } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { AnalyticsService } from './utils/analytics.service';
import { CoreStoreModule } from './store/corestore.module';
import { AuthService } from './data/auth.service';
import { RolesService } from './data/roles.service';
import { TokenInterceptor } from './interceptors/token.interceptor';

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const APP_INTERCEPTORS = [
  TokenInterceptor,
];

export const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: 'http://localhost:5000',
        token: {
          class: NbAuthJWTToken,
          key: 'access_token',
        },
        login: {
          endpoint: '/api/auth/login',
          method: 'post',
          alwaysFail: false,
          defaultErrors: ['Email/Password combination is not correct.'],
          defaultMessages: ['You have been successfully logged in!'],
          redirect: {
            success: '/',
            failure: null,
          },

        },
        register: {
          endpoint: '/api/auth/register',
          method: 'post',
        },
      }),
    ],
    forms: {
      login: {
        redirectDelay: 100,
        showMessages: {
          success: true,
          error: true,
        },
      },
      register: {
        showMessageS: {
          success: true,
          error: true,
        },
        logout: {
          redirectDelay: 0,
        },
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,
  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  ...APP_INTERCEPTORS,
  AnalyticsService,
  AuthService,
  RolesService,
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    CoreStoreModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
