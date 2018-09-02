import {ActionReducerMap} from '@ngrx/store';
import {AuthReducer, IAuth} from './auth/auth.reducer';
import {IUser, UserReducer} from './user/user.reducer';

export interface IAppState {
  auth: IAuth;
  user: IUser;
}

export let AppReducer: ActionReducerMap<IAppState> = {
 auth: AuthReducer,
  user: UserReducer,
};
