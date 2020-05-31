import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../rootReducer'

import * as UserTypes from './types'

export const addRecipe = (recipe: UserTypes.Recipe): UserTypes.AddRecipeAction => ({
  type: UserTypes.USER_ADD_RECIPE,
  payload: {
    recipe
  }
})

export const loadRecipeRequest = ()
: ThunkAction<void, RootState, unknown, Action<string>> =>
async (dispatch, getState) => {
  const {
    firebase: {
      user
    }
  } = getState()


}
