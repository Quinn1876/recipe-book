import { combineReducers } from 'redux';
import userReducer from './user/reducer'
import recipesReducer from './recipes/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  recipes: recipesReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
