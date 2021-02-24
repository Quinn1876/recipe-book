import express from 'express';
import getAll from './get-all';
import add from './add';

const recipes = express.Router();

recipes.get('/', getAll);
recipes.post('/', add);

export default recipes;
