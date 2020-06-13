import { RootState } from './rootReducer'
export const userData = (state: RootState) => state.user.userData
export const isSignedIn = (state: RootState) => state.user.userData !== null
export const getRecipes = (state: RootState) => state.user.recipes
