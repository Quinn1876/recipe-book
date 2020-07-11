
// *** State Interfaces ***
export interface RecipesState {
  byOrder: Recipe[];
  currentRecipe: Recipe | {};
}


// *** Action Types ***
export const RECIPE_ADD_REQUEST = 'RECIPE_ADD_REQUEST';
export const RECIPE_ADD_SUCCESS = 'RECIPE_ADD_SUCCESS';

export const RECIPES_LOAD_REQUEST = 'RECIPES_LOAD_REQUEST';
export const RECIPES_LOAD_SUCCESS = 'RECIPES_LOAD_SUCCESS';

export const RECIPE_LOAD_BY_ID_REQUEST = 'RECIPE_LOAD_BY_ID_REQUEST';
export const RECIPE_LOAD_BY_ID_SUCCESS = 'RECIPE_LOAD_BY_ID_SUCCESS';


// *** Action Payloads
interface RecipesPayload {
  recipes: Recipe[];
}

interface RecipePayload {
  recipe: Recipe
}


// *** Action Interfaces ***
export interface RecipeAddSuccessAction {
  type: typeof RECIPE_ADD_SUCCESS;
  payload: RecipesPayload;
}
export interface RecipesLoadSuccessAction {
  type: typeof RECIPES_LOAD_SUCCESS;
  payload: RecipesPayload;
}

export interface RecipeLoadByIdSuccessAction {
  type: typeof RECIPE_LOAD_BY_ID_SUCCESS;
  payload: RecipePayload;
}

export type RecipesActionTypes = RecipeAddSuccessAction
                               | RecipesLoadSuccessAction
                               | RecipeLoadByIdSuccessAction;
