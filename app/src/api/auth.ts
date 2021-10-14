import server from './server';
import { AxiosResponse } from 'axios';
import { AuthQuery, AuthResponse } from 'auth';

type AxiosAuthResponse = Promise<AxiosResponse<AuthResponse.AuthResult>>
type AxiosSignUpResponse = Promise<AxiosResponse<AuthResponse.SignUpResult>>

const checkCookieAuth = (): AxiosAuthResponse => server.get('/auth');
const signIn = (userName: string, password: string, rememberMe: boolean): AxiosAuthResponse => server.post('/auth/sign-in', { userName, password, remember: rememberMe });
const signUp: (body: AuthQuery.UserAuthSignUpRequest) => AxiosSignUpResponse = (body) => server.post<AuthResponse.SignUpResult>('/auth/sign-up', body);

export default {
  checkCookieAuth,
  signIn,
  signUp,
};
