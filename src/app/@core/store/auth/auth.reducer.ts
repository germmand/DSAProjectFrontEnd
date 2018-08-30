import {AuthActions, AuthActionsWrapper} from './auth.actions';

export interface IAuth {
  access_token: string;
  refresh_token: string;
}

const initialAuthState: IAuth = {
  access_token: '',
  refresh_token: '',
};

export function AuthReducer(state = initialAuthState, action: AuthActionsWrapper): IAuth {
  switch (action.type) {
    case AuthActions.SIGN_IN:
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };
    case AuthActions.SIGN_UP:
      return {
        ...state,
        access_token: action.payload.access_token,
        refresh_token: action.payload.refresh_token,
      };
    case AuthActions.SIGN_OUT:
      return {
        ...state,
        access_token: '',
        refresh_token: '',
      };
    default:
      return state;
  }
}
