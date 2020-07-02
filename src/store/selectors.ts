import { RootState } from './rootReducer';
export const userData = (state: RootState) => state.user.userData;
export const isSignedIn = (state: RootState) => state.user.userData !== null;
export const recipesByOrder = (state: RootState) => state.recipes.byOrder;
export const currentRecipe = (state: RootState) => state.recipes.currentRecipe;
