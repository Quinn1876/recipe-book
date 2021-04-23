import server from './server';
import axios, { AxiosResponse } from 'axios';

type AxiosRecipesResponse = Promise<AxiosResponse<RecipeResponse[]>>;
type AxiosRecipeResponse = Promise<AxiosResponse<RecipeResponse>>;

const getRecipes = (): AxiosRecipesResponse => server.get('/recipes');
const getRecipe = (recipeId): AxiosRecipeResponse => server.get(`/recipes/${recipeId}`);

const createRecipe = (recipe: NewRecipeRequest): AxiosRecipesResponse => server.post('/recipes', recipe);

export default {
  getRecipes,
  getRecipe,
  createRecipe,
};
