import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Recipe from './Recipe';
import useRecipe from '../../../hooks/recipe';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 32px;
`;

const RecipeContainer: React.FC = () => {
  const { recipeId } = useParams<{recipeId: string }>();
  const { recipe } = useRecipe(recipeId);
  console.log('Recipe: ', recipe);

  return (
    <Container>
      {recipe && <Recipe recipe={recipe} />}
    </Container>
  );
};

export default RecipeContainer;
