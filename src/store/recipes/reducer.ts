import * as RecipeTypes from './types';

const initialState: RecipeTypes.RecipesState = {
  byOrder: [],
  currentRecipe: undefined
};

const recipesReducer = (state = initialState, action: RecipeTypes.RecipesActionTypes) => {
  switch (action.type) {

    case RecipeTypes.RECIPE_ADD_SUCCESS: {
      const { payload: { recipes } } = action;
      return {
        ...state,
        byOrder: recipes,
        byId: recipes.reduce((byId, recipe) => ({ ...byId, [recipe.recipeId]: recipe }), {})
      };
    }
    case RecipeTypes.RECIPES_LOAD_SUCCESS: {
      const { payload: { recipes } } = action;
      return {
        ...state,
        byOrder: recipes,
      };
    }
    case RecipeTypes.RECIPE_LOAD_BY_ID_SUCCESS: {
      const { payload: { recipe } } = action;
      return {
        ...state,
        currentRecipe: recipe,
      }
    }
    case RecipeTypes.CLEAR_CURRENT_RECIPE: {
      return {
        ...state,
        currentRecipe: undefined,
      };
    }

  default:
    return {
      ...state,
    };
  }
};

export default recipesReducer;
