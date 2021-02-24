import express from 'express';
import auth from './auth';
import recipes from './recipes';

const api = express.Router();

api.use('/auth', auth);
api.use('/recipes', recipes);

export default api;
