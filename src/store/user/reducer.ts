import * as UserTypes from './types';

const initialState: UserTypes.UserState = {
  userData: null,
};

const userReducer = (
  state = initialState,
  action: UserTypes.UserActionTypes
) => {
  switch (action.type) {
    case UserTypes.USER_SIGN_IN_SUCCESS: {
      const { payload: { user } } = action;
      return {
        ...state,
        userData: user
      }
    }
    default:
      return state;
  }
};

export default userReducer;
