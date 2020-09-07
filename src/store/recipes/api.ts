import axios from 'axios';

const createRecipe = async (recipe: NewRecipe) => axios.post('/recipes/createjson', recipe);
const getRecipes = async () => axios.get('recipes');
const getRecipeById = async (recipeId: RecipeId) => axios.get(`recipes/${recipeId}`);

export default {
  createRecipe,
  getRecipes,
  getRecipeById,
}
