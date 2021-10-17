import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Recipe from './Recipe';
import useRecipe from '../../../hooks/recipe';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const RecipeContainer: React.FC = () => {
  const { recipeId } = useParams<{recipeId: string }>();
  const { recipe } = useRecipe(parseInt(recipeId, 10));
  console.log('Recipe: ', recipe);

  return (
    <Container>
      {recipe && <Recipe recipe={recipe} />}
    </Container>
  );
};

export default RecipeContainer;
