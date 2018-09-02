import {createSelector} from '@ngrx/store';
import {IAppState} from '../app.reducer';
import {IUser} from './user.reducer';

export const getUser = (state: IAppState) => state.user;
export const getId = createSelector(
  getUser,
  (user: IUser) => user.id,
);
export const getEmail = createSelector(
  getUser,
  (user: IUser) => user.email,
);
export const getFullname = createSelector(
  getUser,
  (user: IUser) => user.full_name,
);
export const getRole = createSelector(
  getUser,
  (user: IUser) => user.role,
);
