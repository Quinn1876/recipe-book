import React from 'react';
import { useParams } from 'react-router-dom';

import RecipeDetails from './RecipeDetails';
import useRecipe from './hooks/recipe';

import { isRecipe } from '../../../utils/types/recipe';

const RecipeContainer = () => {
  const { recipeId } = useParams();
  const { recipe } = useRecipe(recipeId);
  console.log('Recipe: ', recipe);

  return (
    <>
      {isRecipe(recipe) && <RecipeDetails recipe={recipe} />}
    </>
  );
};

export default RecipeContainer;
