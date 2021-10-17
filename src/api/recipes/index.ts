import express from 'express';
import getAll from './get-all';
import add from './add';
import get from './get';
import update from './update';
import del from './del';
import getUnits from './units/get-all';
const recipes = express.Router();

recipes.get('/units', getUnits);
recipes.get('/:recipeId', get);
recipes.get('/', getAll);
recipes.post('/', add);
recipes.patch('/', update);
recipes.delete('/:id', del);


export default recipes;
