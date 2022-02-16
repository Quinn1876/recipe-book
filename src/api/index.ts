import express from 'express';
import auth from './auth';
import recipes from './recipes';
import user from './user';

const api = express.Router();

api.use('/auth', auth);
api.use('/recipes', recipes);
api.use('/user', user);

export default api;
