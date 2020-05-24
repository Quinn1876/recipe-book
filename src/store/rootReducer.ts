import { combineReducers } from 'redux';
import firebaseReducer from './firebase/reducer'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
