import express from 'express';
import getAll from './get-all';
import add from './add';
import get from './get';
import update from './update';

const recipes = express.Router();

recipes.get('/:recipeId', get);
recipes.get('/', getAll);
recipes.post('/', add);
recipes.patch('/', update);

export default recipes;
