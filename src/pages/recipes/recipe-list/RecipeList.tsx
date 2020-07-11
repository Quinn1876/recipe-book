import React from 'react'
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid'

import RecipeListItem from './components/RecipeListItem';

import useRecipes from '../../../hooks/recipes';

const RecipeGridItem = styled(Grid)`
  margin-bottom: 16px;
`;

const Container = styled(Grid)`
  padding-top: 16px;
`

const recipeMap =  (recipe: Recipe) => <RecipeGridItem key={recipe.recipeId} item xs={12} md={4} lg={3} xl={2}><RecipeListItem recipe={recipe} /></RecipeGridItem>;

const RecipeList = () => {
  const { recipes } = useRecipes();

  const recipeItems = recipes.map(recipeMap);

  return (
    <Container
      container
      direction="column"
      alignItems="center"
    >
      {recipeItems}
    </Container>
  );
};

export default RecipeList;
