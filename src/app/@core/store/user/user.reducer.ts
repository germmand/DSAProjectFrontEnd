import {UserActions, UserActionsWrapper} from './user.actions';

export interface IUser {
  id: string;
  email: string;
  full_name: string;
  role: string;
}

const initialUserState: IUser = {
  id: '',
  email: '',
  full_name: '',
  role: '',
};

export function UserReducer(state = initialUserState, action: UserActionsWrapper) {
  switch (action.type) {
    case UserActions.LOAD_DATA:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        full_name: action.payload.full_name,
        role: action.payload.role,
      };
    case UserActions.WIPE_DATA:
      return {
        ...state,
        id: '',
        email: '',
        full_name: '',
        role: '',
      };
    default:
      return state;
  }
}
