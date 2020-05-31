import { RootState } from './rootReducer'
export const getUser = (state: RootState) => state.firebase.user
export const signInSuccess = (state: RootState) => state.firebase.signInStatus.loggedIn
export const getRecipies = (state: RootState) => state.user.recipes
