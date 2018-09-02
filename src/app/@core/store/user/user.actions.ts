import {Action} from '@ngrx/store';

export enum UserActions {
  LOAD_DATA = '[User] Load Data',
  WIPE_DATA = '[User] Wipe Data',
}

export class LoadUserData implements Action {
  readonly type = UserActions.LOAD_DATA;
  readonly payload: any;

  constructor(payload: any) {
    this.payload = payload;
  }
}

export class WipeUserData implements Action {
  readonly type = UserActions.WIPE_DATA;
}

export type UserActionsWrapper = LoadUserData | WipeUserData;
