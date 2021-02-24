import { useCallback, useReducer, useState } from 'react';
import useAuthContext from '../../../hooks/auth-context';

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
type Action = EmailChangeAction | PasswordChangeAction;

const initialState = {
  email: '',
  password: '',
};

const reducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
  case EMAIL_CHANGE:
    return {
      ...state,
      email: action.email,
    };
  case PASSWORD_CHANGE:
    return {
      ...state,
      password: action.password,
    };

  default:
    return state;
  }
};

type useSignInHook = () => {
  email: string;
  password: string;
  doChangeEmail: (email: string) => void;
  doChangePassword: (password: string) => void;
  doSignInAttempt: (userName: string, password: string) => void;
  rememberMe: boolean;
  toggleRememberMe: () => void;
}

const useSignIn: useSignInHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [rememberMe, setRememberMe] = useState(false);
  const { signIn } = useAuthContext();

  const doChangeEmail = useCallback(
    email => {
      dispatch({ type: EMAIL_CHANGE, email });
    },
    [dispatch]
  );

  const doChangePassword = useCallback(
    password => {
      dispatch({ type: PASSWORD_CHANGE, password });
    },
    [dispatch]
  );

  const doSignInAttempt = useCallback(() => {
    doChangePassword('');
    signIn(state.email, state.password, rememberMe);
  }, [doChangePassword, state.email, state.password, rememberMe]);

  const toggleRememberMe = useCallback(() => { setRememberMe((r) => !r); }, [setRememberMe]);

  return {
    email: state.email,
    password: state.password,
    rememberMe,
    toggleRememberMe,
    doChangeEmail,
    doChangePassword,
    doSignInAttempt,
  };
};

export default useSignIn;
