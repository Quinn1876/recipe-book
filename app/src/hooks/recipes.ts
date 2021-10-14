import { AxiosError } from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { RecipeResponse } from 'recipes';
import api from '../api';

interface Return {
  recipes: RecipeResponse.GetRecipeResponse[];
  error?: AxiosError;
  loadRecipes: () => void;
}

type RecipesHook = (load?: boolean) => Return;

const useRecipes: RecipesHook = (load = true) => {
  const [recipes, setRecipes] = useState<RecipeResponse.GetRecipeResponse[]>([]);
  const [error, setError] = useState<AxiosError | undefined>(undefined);

  const loadRecipes = useCallback(() => {
    api
      .recipes
      .getRecipes()
      .then((response) => {
        if (response.status === 200) {
          setRecipes(response.data);
          setError(undefined);
        }
      })
      .catch((error: AxiosError) => {
        setError(error);
      });
  }, [setRecipes, setError]);

  useEffect(() => {
    if (load || recipes.length === 0) {
      loadRecipes();
    }
  }, [load, recipes.length]);

  return {
    recipes,
    error,
    loadRecipes,
  };
};

export default useRecipes;
