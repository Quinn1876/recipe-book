import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';



const ImagePlaceholder = styled.div`
  width: 100%;
  height: 215px;

  background-color: ${({ theme }) => theme.palette.primary.main};
`;

interface RecipeProps{
  recipe: Recipe;
};

const RecipeDetails: React.FC<RecipeProps> = ({ recipe }) => {
  const params = useParams();
  console.log(params)
  return (
    <ImagePlaceholder/>
  );
};

export default RecipeDetails;
