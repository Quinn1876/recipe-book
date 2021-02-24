import { useCallback, useReducer } from 'react';
import useAuthContext from '../../../hooks/auth-context';

const EMAIL_CHANGE = 'EMAIL_CHANGE';
const PASSWORD_CHANGE = 'PASSWORD_CHANGE';
const CONFIRM_PASSWORD_CHANGE = 'CONFIRM_PASSWORD_CHANGE';
const NAME_CHANGE = 'NAME_CHANGE';

interface EmailChangeAction {
  type: typeof EMAIL_CHANGE;
  email: string;
}

interface PasswordChangeAction {
  type: typeof PASSWORD_CHANGE;
  password: string;
}

interface ConfirmPasswordChange {
  type: typeof CONFIRM_PASSWORD_CHANGE;
  confirmPassword: string;
}

interface NameChange {
  type: typeof NAME_CHANGE;
  name: string;
}

type Action = EmailChangeAction
            | PasswordChangeAction
            | ConfirmPasswordChange
            | NameChange;

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
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
  case CONFIRM_PASSWORD_CHANGE:
    return {
      ...state,
      confirmPassword: action.confirmPassword,
    };
  case NAME_CHANGE:
    return {
      ...state,
      name: action.name,
    };

  default:
    return state;
  }
};

type useSignUpHook = () => {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  doChangeEmail: (email: string) => void;
  doChangePassword: (password: string) => void;
  doChangeConfirmPassword: (confirmPassword: string) => void;
  doChangeName: (name: string) => void;
  doSignUpAttempt: () => void;
}

const useSignUp: useSignUpHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signUp } = useAuthContext();

  const doChangeEmail = useCallback(
    email => {
      dispatch({ type: EMAIL_CHANGE, email });
    },
    [dispatch]
  );

  const doChangePassword = useCallback(
    (password) => {
      dispatch({ type: PASSWORD_CHANGE, password });
    },
    [dispatch]
  );

  const doChangeConfirmPassword = useCallback(
    (confirmPassword) => {
      dispatch({ type: CONFIRM_PASSWORD_CHANGE, confirmPassword });
    },
    [dispatch]
  );

  const doChangeName = useCallback(
    (name) => {
      dispatch({ type: NAME_CHANGE, name });
    },
    [dispatch]
  );

  const doSignUpAttempt = useCallback(() => {
    if (state.confirmPassword === state.password) {
      signUp(state.email, state.password, state.name);
      doChangePassword('');
    }
  }, [doChangePassword, state.email, state.password, state.confirmPassword, state.name]);

  return {
    email: state.email,
    password: state.password,
    name: state.name,
    confirmPassword: state.confirmPassword,
    doChangeEmail,
    doChangePassword,
    doSignUpAttempt,
    doChangeConfirmPassword,
    doChangeName,
  };
};

export default useSignUp;
