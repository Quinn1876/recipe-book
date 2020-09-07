import React from 'react';
import { useParams } from 'react-router-dom';

import Recipe from './Recipe';
import useRecipe from './hooks/recipe';

const RecipeContainer = () => {
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);
  console.log('Recipe: ', recipe);

  return (
    <>
      {recipe && <Recipe recipe={recipe} />}
    </>
  );
};

export default RecipeContainer;
