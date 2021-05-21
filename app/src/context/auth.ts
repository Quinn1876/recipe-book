import {createContext} from 'react';

interface AuthContextI {
  signIn: (userName: string, password: string, rememberMe: boolean) => void;
  signUp: (userName: string, password: string, name: string) => void;
  userId: string | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextI | null>(null);

