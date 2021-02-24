import server from './server';
import { AxiosResponse } from 'axios';

type AxiosAuthResponse = Promise<AxiosResponse<AuthResponse | string>>

const checkCookieAuth = (): AxiosAuthResponse => server.get('/auth');
const signIn = (userName: string, password: string, rememberMe: boolean): AxiosAuthResponse => server.post('/auth/sign-in', { userName, password, remember: rememberMe });
const signUp: (body: SignUpBody) => AxiosAuthResponse = (body) => server.post('/auth/sign-up', body);

export default {
  checkCookieAuth,
  signIn,
  signUp,
};
