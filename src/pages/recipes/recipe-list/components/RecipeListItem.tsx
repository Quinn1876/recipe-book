import React from 'react';
import styled from 'styled-components';
import { useHistory, useRouteMatch } from 'react-router-dom';

import MUIPaper from '@material-ui/core/Paper';
import MUITypography from '@material-ui/core/Typography';

const Paper = styled(MUIPaper)`
  width: 311px;
  height: 337px;
  &:hover {
    cursor: pointer;
  };
`;

const Image = styled.div`
  height: 200px;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.default};
  &:hover: {
    cursor: pointer;
  }
`;

const Body = styled.div`
  padding-top: 8px;
  padding-left: 32px;

  &:hover {
    cursor: pointer;
  }
`;

const Header = styled(MUITypography)`
  padding-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Typography = styled(MUITypography)``;

interface RecipeListItemProps {
  recipe: Recipe;
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({ recipe }) => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleClick = () => {
    history.push(`${url}/${recipe.recipeId}`);
  };

  return (
      <Paper elevation={2} onClick={handleClick}>
        <Image/>
        <Body>
          <Header
            variant="h6"
            color="textSecondary"
          >
            {recipe.name}
          </Header>
          <Typography variant="body1" color="textSecondary">{recipe.description}</Typography>
        </Body>
      </Paper>
  );
};

export default RecipeListItem;
