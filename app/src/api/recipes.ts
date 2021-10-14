import server from './server';
import { AxiosResponse } from 'axios';
import { RecipeQuery, RecipeResponse } from 'recipes';

type AxiosRecipesResponse = Promise<AxiosResponse<RecipeResponse.GetRecipeResponse[]>>;
type AxiosRecipeResponse = Promise<AxiosResponse<RecipeResponse.GetRecipeResponse>>;
type AxiosUpdateRecipeResponse = Promise<AxiosResponse<string>>;

const getRecipes = (): AxiosRecipesResponse => server.get('/recipes');
const getRecipe = (recipeId: number): AxiosRecipeResponse => server.get(`/recipes/${recipeId}`);

const createRecipe = (recipe: RecipeQuery.NewRecipeRequest): AxiosRecipesResponse => server.post('/recipes', recipe);

const updateRecipe = (recipe: RecipeQuery.UpdateRecipeRequest): AxiosUpdateRecipeResponse => server.patch('/recipes', recipe);

export default {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
};
