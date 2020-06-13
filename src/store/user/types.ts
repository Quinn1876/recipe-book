import { Recipe, NewRecipe } from '../../Firebase/types';

// *** State Interfaces ***
export interface UserState {
  recipes: Recipe[];
  userData: firebase.User | null;
}

// *** Action Types ***
export const USER_ADD_RECIPE_REQUEST = 'USER_ADD_RECIPE_REQUEST';
export const USER_ADD_RECIPE_SUCCESS = 'USER_ADD_RECIPE_SUCCESS';

export const USER_GET_RECIPES_REQUEST = 'USER_GET_RECIPES_REQUEST';
export const USER_GET_RECIPES_SUCCESS = 'USER_GET_RECIPES_SUCCESS';

export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';

// *** Action Payloads ***
interface RecipePayload {
  recipes: Recipe[];
}
interface UserPayload {
  user: firebase.User;
}

// *** Action Interfaces ***
export interface AddRecipeSuccessAction {
  type: typeof USER_ADD_RECIPE_SUCCESS;
  payload: RecipePayload;
}
export interface LoadRecipeSuccessAction {
  type: typeof USER_GET_RECIPES_SUCCESS;
  payload: RecipePayload;
}

export interface SignInSuccessAction {
  type: typeof USER_SIGN_IN_SUCCESS;
  payload: UserPayload;
}

export type UserActionTypes = AddRecipeSuccessAction
                            | LoadRecipeSuccessAction
                            | SignInSuccessAction;
