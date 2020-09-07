import { useEffect } from 'react';

interface RecipeResponse {
  recipe?: Recipe;
};

type RecipeHook = (recipeId: string) => RecipeResponse;


const useRecipe: RecipeHook = (recipeId) => {
  const recipe = null;
  return {
    recipe,
  };
};

export default useRecipe;
