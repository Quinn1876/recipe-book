import server from './server';
import { AxiosResponse } from 'axios';

type AxiosRecipeResponse = Promise<AxiosResponse<RecipeResponse[]>>;

const getRecipes = (): AxiosRecipeResponse => server.get('/recipes');

export default {
  getRecipes,
};
