import { AuthResponse } from 'auth';
import { useEffect, useCallback, useState } from 'react';
import api from '../api';

type useAuthHook = (attemptCookieAuth?: boolean) => {
  signIn: (userName: string, password: string, rememberMe: boolean) => void;
  signUp: (userName: string, password: string, name: string) => void;
  userId: number | null;
  loading: boolean;
}

/**
 * To access this state other than in App.tsx, use useAuthContext
 */
const useAuth: useAuthHook = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(`Value: ${userId}`);
  }, [userId]);

  const signIn = useCallback(async (userName: string, password: string, rememberMe: boolean) => {
    try {
      const { data: authResult, status } = await api.auth.signIn(userName, password, rememberMe);
      if (status === 200) {
        if (authResult.authenticated) {
          setUserId(authResult.userId);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [setUserId]);

  const signUp = useCallback(async (userName: string, password: string, name: string) => {
    console.log('Signing up');
    try {
      const { data: signUpResult, status } = await api.auth.signUp({ userName, password, name, type: 'USER_AUTH' });
      if (status === 200) {
        if (signUpResult.accountCreated) {
          setUserId(signUpResult.userId);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [setUserId]);

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const { data: authResult, status } = await api.auth.checkCookieAuth();
        if (status === 200) {
          if (authResult.authenticated) {
            setUserId(authResult.userId);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [setUserId]);

  return {
    userId,
    signIn,
    signUp,
    loading,
  };
};

export default useAuth;
