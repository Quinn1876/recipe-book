import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import api from '../api';
import { RecipeResponse } from 'recipes';

interface Return {
  recipe?: RecipeResponse.GetRecipeResponse;
  error?: AxiosError;
}

type RecipeHook = (recipeId?: number) => Return;


const useRecipe: RecipeHook = (recipeId) => {
  const [recipe, setRecipe] = useState<RecipeResponse.GetRecipeResponse | undefined>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  useEffect(() => {
    if (recipeId) {
      api.recipes.getRecipe(recipeId)
        .then((response) => {
          setRecipe(response.data);
          setError(undefined);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [recipeId]);

  return {
    recipe,
    error,
  };
};

export default useRecipe;
