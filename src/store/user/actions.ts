import * as UserTypes from './types';
import Firebase from '../../Firebase/Firebase';
import { Thunk } from '../../types/Thunk';


export const signInRequest = (
  email: string,
  password: string
): Thunk => async dispatch => {
  try {
    const user = await Firebase.signInWithEmailAndPassword(email, password);
    if (user) dispatch(signInSuccess(user));
  } catch (err) {
    console.error(err);
  }
};

const signInSuccess = (user: firebase.User): UserTypes.SignInSuccessAction => ({
  type: UserTypes.USER_SIGN_IN_SUCCESS,
  payload: {
    user,
  },
});
