import {Action} from '@ngrx/store';
import {IAuth} from './auth.reducer';

export enum AuthActions {
  SIGN_IN = '[Auth] SIGN IN',
  SIGN_UP = '[Auth] SIGN UP',
  SIGN_OUT = '[Auth] SIGN OUT',
}

export class SignIn implements Action {
  readonly type = AuthActions.SIGN_IN;
  readonly payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class SignOut implements Action {
  readonly type = AuthActions.SIGN_OUT;
}

export class SignUp implements Action {
  readonly type = AuthActions.SIGN_UP;
  readonly payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export type AuthActionsWrapper = SignIn | SignOut | SignUp;
