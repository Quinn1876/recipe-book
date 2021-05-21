import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../../api';
import useRecipe from '../../../hooks/recipe';
import useRouterContext from '../../../hooks/router-context';
import RecipeForm from '../components/RecipeForm';

const EditRecipePage: React.FC = () => {
  const { routerContext } = useRouterContext();
  const history = useHistory();

  const { recipeId } = useParams<{ recipeId: string }>();
  const { recipe } = useRecipe(recipeId);

  const handleBack = useCallback(() => {
    history.push(`${routerContext.url}/recipe/${recipeId}`);
  }, [history, routerContext]);

  const handleRecipeSave = useCallback(
    (updatedRecipe: RecipeResponse) => {
      api.recipes
        .updateRecipe({
          description: updatedRecipe.description,
          directions: updatedRecipe.directions,
          id: recipeId,
          ingredients: updatedRecipe.ingredients,
          name: updatedRecipe.name,
        })
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
