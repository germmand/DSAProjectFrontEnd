import {IAppState} from '../app.reducer';
import {createSelector} from '@ngrx/store';
import {IAuth} from './auth.reducer';

export const getAuth = (state: IAppState) => state.auth;
export const getAccessToken = createSelector(
  getAuth,
  (auth: IAuth) => auth.access_token,
);
export const getRefreshToken = createSelector(
  getAuth,
  (auth: IAuth) => auth.refresh_token,
);
