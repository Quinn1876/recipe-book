import React from 'react';
import { useParams } from 'react-router-dom';
import useAuthContext from '../../../hooks/auth-context';
import useRecipe from '../../../hooks/recipe';
import EditRecipeForm from './components/EditRecipeForm';

const EditRecipePage: React.FC = () => {
  const { userId } = useAuthContext();
  const { recipeId } = useParams<{ recipeId: string }>();
  const { recipe  } = useRecipe(recipeId);

  return <EditRecipeForm recipe={recipe}/>;
};

export default EditRecipePage;
