import React from 'react';
import useEditRecipeForm from '../hooks/edit-recipe-form';

interface Props {
  recipe: RecipeResponse;
}

const EditRecipeForm: React.FC<Props> = ({ recipe }) => {
  useEditRecipeForm(recipe);
  return <div></div>;
};

export default EditRecipeForm;
