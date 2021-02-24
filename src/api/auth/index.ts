import { Router } from 'express';
import signIn from './sign-in';
import signUp from './sign-up';
import checkCookieAuth from './check-auth-cookie';

const auth = Router();

auth.get('/', checkCookieAuth);
auth.post('/sign-in', signIn);
auth.post('/sign-up', signUp);

export default auth;
