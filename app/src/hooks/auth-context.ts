import { useContext, useEffect, useCallback, useMemo } from 'react';
import { AuthContext } from '../context/auth';

type useAuthContextHook = () => {
  isAuthenticated: () => boolean;
  userId: string | null;
  signIn: (userName: string, password: string, rememberMe: boolean) => void;
  signUp: (userName: string, password: string, name: string) => void;
};

const useAuthContext: useAuthContextHook = () => {
  const authContext = useContext(AuthContext);

  const isAuthenticated = useCallback(() => authContext?.userId !== null, [authContext]);


  useEffect(() => {
    console.log(`UserId: ${authContext?.userId}`);
    console.log(isAuthenticated());
  }, [authContext]);

  const authContextResponse = useMemo<ReturnType<useAuthContextHook>>(() => {
    return authContext
      ? {
        ...authContext,
        isAuthenticated,
      }
      : {
        isAuthenticated: (): boolean => { console.error('Unable to access Auth context'); return false; },
        signIn: (): void => { console.error('Unable to access Auth context'); },
        signUp: (): void => { console.error('Unable to access Auth context'); },
        userId: null,
      };
  }, [authContext]);

  return authContextResponse;
};

export default useAuthContext;
