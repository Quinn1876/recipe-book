import { useEffect, useState } from 'react';
import Axios, { AxiosError, AxiosResponse } from 'axios';

interface RecipeResponse {
  recipe?: Recipe;
  error?: AxiosError;
}

type RecipeHook = (recipeId?: string) => RecipeResponse;


const useRecipe: RecipeHook = (recipeId) => {
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  useEffect(() => {
    if (recipeId) {
      Axios
        .get(`/recipes/${recipeId}`)
        .then((response: AxiosResponse<Recipe>) => {
          setRecipe(response.data);
          setError(undefined);
        })
        .catch((error: AxiosError) => {
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
