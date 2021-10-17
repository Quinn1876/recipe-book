import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import api from '../api';
import { RecipeResponse, RecipeQuery } from 'recipes';
import { useMemo } from 'hoist-non-react-statics/node_modules/@types/react';

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
          response.data.directions.sort((a,b) => a.directionNumber - b.directionNumber);
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
