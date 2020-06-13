import * as UserTypes from './types';

const initialState: UserTypes.UserState = {
  recipes: [],
  userData: null,
};

const userReducer = (
  state = initialState,
  action: UserTypes.UserActionTypes
) => {
  switch (action.type) {
    case UserTypes.USER_ADD_RECIPE_SUCCESS: {
      const { payload: { recipes } } = action;
      return {
        ...state,
        recipes,
      };
    }
    case UserTypes.USER_GET_RECIPES_SUCCESS: {
      const { payload: { recipes } } = action;
      return {
        ...state,
        recipes,
      };
    }
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
