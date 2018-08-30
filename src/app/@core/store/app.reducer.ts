import {ActionReducerMap} from '@ngrx/store';
import {AuthReducer, IAuth} from './auth/auth.reducer';

export interface IAppState {
  auth: IAuth;
}

export let AppReducer: ActionReducerMap<IAppState> = {
 auth: AuthReducer,
};
