import * as RecipesTypes from './types';
import Firebase from '../../Firebase/Firebase';
import { Thunk } from '../../types/Thunk';


export const recipeAddRequest = (
  recipe: NewRecipe
): Thunk => async (
  dispatch,
  getState
) => {
  try {
    const recipes = await Firebase.fetchRecipeRequest(recipe);
    dispatch(recipeAddSuccess(recipes));
  } catch (err) {
    console.error(err);
  }
};

const recipeAddSuccess = (
  recipes: Recipe[]
): RecipesTypes.RecipeAddSuccessAction => ({
  type: RecipesTypes.RECIPE_ADD_SUCCESS,
  payload: {
    recipes,
  },
});

// TODO Add friends recipes to this call eventually
export const recipesLoadRequest = (): Thunk => async dispatch => {
  try {
    const recipes = await Firebase.loadUserRecipesRequest();
    dispatch(recipesLoadSuccess(recipes));
  } catch (err) {
    console.error(err);
  }
};

const recipesLoadSuccess = (
  recipes: Recipe[]
): RecipesTypes.RecipesLoadSuccessAction => ({
  type: RecipesTypes.RECIPES_LOAD_SUCCESS,
  payload: {
    recipes,
  },
});

export const recipeLoadRequest = (recipeId: RecipeId): Thunk => async dispatch => {
  try {
    const recipe = await Firebase.loadRecipeByIdRequest(recipeId);
  } catch (err) {
    console.error(err);
  }
}
