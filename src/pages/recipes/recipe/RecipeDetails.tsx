import React from 'react';
import styled from 'styled-components';


const ImagePlaceholder = styled.div`
  width: 100%;
  height: 215px;

  background-color: ${({ theme }) => theme.palette.primary.main};
`;

interface RecipeProps{
  recipe: Recipe;
};

const RecipeDetails: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <>
      <ImagePlaceholder/>
      {recipe.name}
    </>
  );
};

export default RecipeDetails;
