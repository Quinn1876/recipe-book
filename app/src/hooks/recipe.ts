import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import api from '../api';

interface Return {
  recipe?: RecipeResponse;
  error?: AxiosError;
}

type RecipeHook = (recipeId?: string) => Return;


const useRecipe: RecipeHook = (recipeId) => {
  const [recipe, setRecipe] = useState<RecipeResponse | undefined>(undefined);
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
