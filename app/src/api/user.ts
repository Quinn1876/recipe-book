import server from './server';
import { AxiosResponse } from 'axios';

const getUser = (): Promise<AxiosResponse<UserRow>> => server.get('/user');

export default {
  getUser,
};

