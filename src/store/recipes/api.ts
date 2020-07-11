import axios from 'axios';

const createRecipe = async (recipe: NewRecipe) => axios.post('/recipes/createjson', recipe);
const getRecipes = async () => axios.get('recipes');

export default {
  createRecipe,
  getRecipes
}
