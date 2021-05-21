import server from './server';
import { AxiosResponse } from 'axios';

type AxiosRecipesResponse = Promise<AxiosResponse<RecipeResponse[]>>;
type AxiosRecipeResponse = Promise<AxiosResponse<RecipeResponse>>;
type AxiosUpdateRecipeResponse = Promise<AxiosResponse<string>>;

const getRecipes = (): AxiosRecipesResponse => server.get('/recipes');
const getRecipe = (recipeId): AxiosRecipeResponse => server.get(`/recipes/${recipeId}`);

const createRecipe = (recipe: NewRecipeRequest): AxiosRecipesResponse => server.post('/recipes', recipe);

const updateRecipe = (recipe: UpdateRecipeRequest): AxiosUpdateRecipeResponse => server.patch('/recipes', recipe);

export default {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
};
