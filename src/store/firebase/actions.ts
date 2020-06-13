import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../rootReducer'
import {
  SIGN_IN_STARTED,
  SIGN_IN_FAILED,
  SIGN_IN_COMPLETED,
  SIGN_IN_STATUS,
  UPDATE_USER,
  FirebaseActionTypes
} from './types'

const signInStatusChange = (type: SIGN_IN_STATUS, msg?: string): FirebaseActionTypes => ({
  type,
  msg
})

export const updateUser = (user: firebase.User): FirebaseActionTypes => ({
  type: UPDATE_USER,
  user
})

// export const signInWithEmailAndPassword = (
//   email: string,
//   password: string
// ): ThunkAction<void, RootState, unknown, Action<string>>  => async (dispatch, getState) => {
//   dispatch(signInStatusChange(SIGN_IN_STARTED));

//   // const { firebase } = getState();

//   try {
//     await firebase.auth.setPersistence('local')
//     const {user} = await firebase.auth.signInWithEmailAndPassword(email, password);
//     if (user != null) {
//       dispatch(updateUser(user))
//       dispatch(signInStatusChange(SIGN_IN_COMPLETED))
//     } else {
//       console.log('user not found')
//     }
//   } catch(e) {
//     dispatch(signInStatusChange(SIGN_IN_FAILED, e))
//   }
// }
