import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../rootReducer'
import {
  SIGN_IN_STARTED,
  SIGN_IN_FAILED,
  SIGN_IN_COMPLETED,
  SIGN_IN_STATUS,
  FirebaseActionTypes
} from './types'

const signInStatusChange = (type: SIGN_IN_STATUS, msg?: string): FirebaseActionTypes => ({
  type,
  msg
})


export const signInWithEmailAndPassword = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, Action<string>>  => async (dispatch, getState) => {
  dispatch(signInStatusChange(SIGN_IN_STARTED));

  const { firebase } = getState();

  try {
    const response = await firebase.auth.signInWithEmailAndPassword(email, password);
    console.log(response)
    dispatch(signInStatusChange(SIGN_IN_COMPLETED))
  } catch(e) {
    dispatch(signInStatusChange(SIGN_IN_FAILED, e))
  }
}
