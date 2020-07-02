import React from 'react';
import { useParams } from 'react-router-dom';

import RecipeDetails from './Recipe';
import useRecipe from './hooks/recipe';

const RecipeContainer = () => {
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);

  return (
    <>
      {isRecipe(recipe) && <RecipeDetails recipe={recipe} />}
    </>
  );
};

export default RecipeContainer;
