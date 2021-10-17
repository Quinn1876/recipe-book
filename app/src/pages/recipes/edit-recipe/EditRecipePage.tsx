import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RecipeQuery } from 'recipes';
import api from '../../../api';
import useRecipe from '../../../hooks/recipe';
import useRouterContext from '../../../hooks/router-context';
import RecipeForm from '../components/RecipeForm';

const EditRecipePage: React.FC = () => {
  const { routerContext } = useRouterContext();
  const history = useHistory();

  const { recipeId } = useParams<{ recipeId: string }>();
  const { recipe } = useRecipe(parseInt(recipeId, 10));

  const handleBack = useCallback(() => {
    history.push(`${routerContext.url}/recipe/${recipeId}`);
  }, [history, routerContext]);

  const handleRecipeSave = useCallback(
    (updatedRecipe: RecipeQuery.UpdateRecipeRequest) => {
      api.recipes
        .updateRecipe(updatedRecipe)
        .then(() => {
          handleBack();
        });
    },
    [api],
  );

  return (
    recipe ? (
      <RecipeForm
        initialState={recipe}
        onSave={handleRecipeSave}
        onBack={handleBack}
      />
    ) : (
      <></>
    )
  );
};

export default EditRecipePage;
