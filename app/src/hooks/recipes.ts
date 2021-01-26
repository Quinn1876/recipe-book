import axios, { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';

interface Return {
  recipes: Recipe[];
  error?: AxiosError;
}

type RecipesHook = (load?: boolean) => Return;

const useRecipes: RecipesHook = (load = true) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  useEffect(() => {
    if (load || recipes.length === 0) {
      axios
        .get('/recipes')
        .then((response: AxiosResponse<Recipe[]>) => {
          if (response.data) {
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
