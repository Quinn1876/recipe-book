import { useCallback, useReducer } from 'react';

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

const reducer = (state: typeof initialState, action: Action) => {
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

const useSignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
  }, [doChangePassword]);

  return {
    email: state.email,
    password: state.password,
    doChangeEmail,
    doChangePassword,
    doSignInAttempt,
  };
};

export default useSignIn;
