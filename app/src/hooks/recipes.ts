import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import api from '../api';

interface Return {
  recipes: RecipeResponse[];
  error?: AxiosError;
}

type RecipesHook = (load?: boolean) => Return;

const useRecipes: RecipesHook = (load = true) => {
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  useEffect(() => {
    if (load || recipes.length === 0) {
      api
        .recipes
        .getRecipes()
        .then((response) => {
          if (response.status === 200 ) {
            setRecipes(response.data);
            setError(undefined);
          }
        })
        .catch((error: AxiosError) => {
          setError(error);
        });
    }
  }, [load, recipes.length]);

  return {
    recipes,
    error
  };
};

export default useRecipes;
