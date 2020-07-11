import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../../../../store/selectors';
import * as recipesActions from '../../../../store/recipes/actions';


interface RecipeResponse {
  recipe: Recipe | {};
};

type RecipeHook = (recipeId: string) => RecipeResponse;


const useRecipe: RecipeHook = (recipeId) => {
  const dispatch = useDispatch();
  const recipe = useSelector(selectors.currentRecipe);

  useEffect(
    () => {
      // dispatch(recipesActions.recipeLoadRequest(recipeId));
    },
    [dispatch, recipeId],
  );

  return {
    recipe,
  };
};

export default useRecipe;
