import { useContext, useEffect, useCallback } from 'react';
import { AuthContext } from '../context/auth';

type useAuthContextHook = () => {
  isAuthenticated: () => boolean;
  userId: string | null;
  signIn: (userName: string, password: string, rememberMe: boolean) => void;
  signUp: (userName: string, password: string, name: string) => void;
}

const useAuthContext: useAuthContextHook = () => {
  const { userId, signIn, signUp } = useContext(AuthContext);

  const isAuthenticated = useCallback(() => userId !== null, [userId]);


  useEffect(() => {
    console.log(`UserId: ${userId}`);
    console.log(isAuthenticated());
  }, [userId]);

  return {
    userId,
    isAuthenticated,
    signIn,
    signUp,
  };
};

export default useAuthContext;
