import * as RecipesTypes from './types';
import { Thunk } from '../../types/Thunk';
import api from './api';
import { isRecipe } from '../../utils/types/recipe';


export const recipeAddRequest = (
  recipe: NewRecipe
): Thunk => async (
  dispatch,
  getState
) => {
  try {
    await api.createRecipe(recipe);
    const { data: recipes } = await api.getRecipes();
    const verifiedRecipes: Recipe[] = recipes.filter((r: any) => isRecipe(r));
    if (verifiedRecipes.length === recipes.length) {
      dispatch(recipeAddSuccess(verifiedRecipes));
    } else {
      throw new Error('recipeAddRequest: Request Failed');
    }
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
    const { data: recipes } = await api.getRecipes();
    const verifiedRecipes: Recipe[] = recipes.filter((r: any) => isRecipe(r));
    if (verifiedRecipes.length === recipes.length) {
      dispatch(recipesLoadSuccess(verifiedRecipes));
    } else {
      throw new Error('recipeLoadRequest: Request Failed');
    }
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

// TODO ReWrite for Flask
// export const recipeLoadRequest = (recipeId: RecipeId): Thunk => async dispatch => {
//   try {
//     const recipe = await Firebase.loadRecipeByIdRequest(recipeId);
//     dispatch(recipeLoadSuccess(recipe))
//   } catch (err) {
//     console.error(err);
//   }
// }

// const recipeLoadSuccess = (recipe: Recipe): RecipesTypes.RecipeLoadByIdSuccessAction => ({
//   type: RecipesTypes.RECIPE_LOAD_BY_ID_SUCCESS,
//   payload: {
//     recipe,
//   },
// });
