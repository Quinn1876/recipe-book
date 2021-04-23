import express from 'express';
import getAll from './get-all';
import add from './add';
import get from './get';

const recipes = express.Router();

recipes.get('/:recipeId', get);
recipes.get('/', getAll);
recipes.post('/', add);

export default recipes;
