import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../rootReducer';

import * as UserTypes from './types';
import Firebase from '../../Firebase/Firebase';
import * as FirebaseTypes from '../../Firebase/types';

export const addRedicpeRequest = (
  recipe: FirebaseTypes.NewRecipe
): ThunkAction<void, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  try {
    const recipes = await Firebase.addRecipeRequest(recipe);
    dispatch(addRecipeSuccess(recipes));
  } catch (err) {
    console.error(err);
  }
};

const addRecipeSuccess = (
  recipes: FirebaseTypes.Recipe[]
): UserTypes.AddRecipeSuccessAction => ({
  type: UserTypes.USER_ADD_RECIPE_SUCCESS,
  payload: {
    recipes,
  },
});

// TODO Add friends recipes to this call eventually
export const loadRecipesRequest = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => async dispatch => {
  try {
    const recipes = await Firebase.getUserRecipesRequest();
    dispatch(loadRecipesSuccess(recipes));
  } catch (err) {
    console.error(err);
  }
};

const loadRecipesSuccess = (
  recipes: FirebaseTypes.Recipe[]
): UserTypes.LoadRecipeSuccessAction => ({
  type: UserTypes.USER_GET_RECIPES_SUCCESS,
  payload: {
    recipes,
  },
});

export const signInRequest = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
  try {
    const user = await Firebase.signInWithEmailAndPassword(email, password);
    if (user) dispatch(signInSuccess(user));
  } catch (err) {
    console.error(err);
  }
};

const signInSuccess = (user: firebase.User): UserTypes.SignInSuccessAction => ({
  type: UserTypes.USER_SIGN_IN_SUCCESS,
  payload: {
    user,
  },
});
