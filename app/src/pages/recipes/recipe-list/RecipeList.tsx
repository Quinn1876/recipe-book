import React, { useCallback } from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import RecipeListItem from './components/RecipeListItem';

import useRecipes from '../../../hooks/recipes';
import AddRecipeButton from './components/AddRecipeButton';
import { useHistory } from 'react-router';
import useRouterContext from '../../../hooks/router-context';



const RecipeGridItem = styled(Grid).attrs({
  item: true,
  xs:12,
  md: 4,
  lg: 3,
  xl: 2,
})`
  margin-bottom: 16px;
`;

const Container = styled(Grid)`
  padding-top: 16px;
`;

const recipeMap = (recipe: RecipeResponse): React.ReactElement => (
  <RecipeGridItem key={recipe.id}>
    <RecipeListItem recipe={recipe} />
  </RecipeGridItem>
);

const RecipeList: React.FC = () => {
  const history = useHistory();
  const { routerContext } = useRouterContext();
  const { recipes } = useRecipes();

  const handleNewRecipe = useCallback(() => {
    history.push(`${routerContext.url}/new`);
  }, [history, routerContext]);

  const recipeItems = recipes.map(recipeMap);

  return (
    <>
      <Container container direction="column" alignItems="center">
        {recipeItems}
        <RecipeGridItem>
          <AddRecipeButton onClick={handleNewRecipe} />
        </RecipeGridItem>
      </Container>
    </>
  );
};

export default RecipeList;
