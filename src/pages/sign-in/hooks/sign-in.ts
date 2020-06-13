import { useCallback, useReducer, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as UserActions from '../../../store/user/actions';

const EMAIL_CHANGE = 'EMAIL_CHANGE';
const PASSWORD_CHANGE = 'PASSWORD_CHANGE';

interface EmailChangeAction {
  type: typeof EMAIL_CHANGE;
  email: string;
}

interface PasswordChangeAction {
  type: typeof PASSWORD_CHANGE;
  password: string;
}
type Action = EmailChangeAction | PasswordChangeAction

const initialState = {
  email: '',
  password: '',
};

const reducer = (
  state: typeof initialState,
  action: Action
  ) => {
  switch (action.type) {
    case EMAIL_CHANGE:
      return {
        ...state,
        email: action.email,
      }
    case PASSWORD_CHANGE:
      return {
        ...state,
        password: action.password,
      }

    default:
      return state;
  }
}

const useSignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const reduxDispatch = useDispatch();

  useEffect(() => {
    if ( process.env.NODE_ENV === 'development' ) {
      const email = process.env.REACT_APP_USERNAME;
      const password = process.env.REACT_APP_PASSWORD;
      console.log('Attempting automatic dev sign in with: ')
      console.log('email: ', email);
      console.log('password: ', password);
      email && password && reduxDispatch(UserActions.signInRequest(email, password));
    }
  }, []);

  const doChangeEmail = useCallback(
    (email) => {
      dispatch({ type: EMAIL_CHANGE, email});
    },
    [dispatch],
  );

  const doChangePassword = useCallback(
    (password) => {
      dispatch({ type: PASSWORD_CHANGE, password });
    },
    [dispatch],
  );

  const doSignInAttempt = useCallback(
    () => {
      reduxDispatch(UserActions.signInRequest(state.email, state.password));
      doChangePassword('');
    },
    [reduxDispatch, doChangePassword, state.email, state.password],
  );

  return {
    email: state.email,
    password: state.password,
    doChangeEmail,
    doChangePassword,
    doSignInAttempt,
  }
}

export default useSignIn;
