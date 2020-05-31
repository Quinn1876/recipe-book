import * as UserTypes from './types'

const initialState: UserTypes.UserState = {
  recipes: [],
}

const userReducer = (state = initialState, action: UserTypes.UserActionTypes) => {
  const {type} = action;
  switch (type) {

  case UserTypes.USER_ADD_RECIPE:
    const { payload: recipe } = action;
    return {
      ...state,
      recipes: [
        ...state.recipes,
        recipe,
      ],
    }

  default:
    return state
  }
}
