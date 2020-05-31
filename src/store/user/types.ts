// *** State Interfaces ***
export interface Recipe {
  title: string,
  description: string,
  ingredients: string,
  tags: string[],
}
export interface UserState {
  recipes: Recipe[]
}

// *** Action Types ***
export const USER_ADD_RECIPE = 'USER_ADD_RECIPE'

// *** Action Interfaces***
export interface AddRecipeAction {
  type: typeof USER_ADD_RECIPE,
  payload: {
    recipe: Recipe
  }
}

export type UserActionTypes = AddRecipeAction
