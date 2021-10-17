import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import MUIList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import UnstyledDropList from './components/DropList';
import MUIIconButton from '@material-ui/core/IconButton';
import EditIconSvg from '../../../assets/edit-icon.svg';
import useRouterContext from '../../../hooks/router-context';
import { useHistory } from 'react-router';
import { RecipeResponse } from 'recipes';

const DropList = styled(UnstyledDropList)``;

const RecipeImage = styled.img``;

const EditIcon = styled.img``;

const IconButton = styled(MUIIconButton)``;

const ImageContainer = styled.div`
  width: 100%;
  height: 215px;
  position: relative;

  background-color: ${({ theme }): string => theme.palette.primary.main};
  ${RecipeImage} {
    width: 100%;
    height: 215px;
    object-fit: cover;
  }

  ${IconButton} {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: ${({ theme }): string => theme.palette.primary.main};
    box-shadow: ${({ theme}): string => theme.shadow.shadow2};
  }
`;

const Container = styled.div`
  width: 100%;

@media only screen and (min-width: 600px) {
    width: 600px;
    margin: 32px;
    box-shadow: ${({ theme }): string => theme.shadow.shadow2};
    align-self: center;
    justify-self: center;
  }

`;

const RecipeName = styled.h3`
  font: bold 20px Arial;
  color: ${({ theme }): string => theme.palette.text.secondary};
`;

const RecipeDescription = styled.div`
  font: 14px Arial;
  color: ${({ theme }): string => theme.palette.text.secondary};
`;

const RecipeDetails = styled.div`
  background-color: white;
  padding-left: 32px;
  padding-top: 16px;
  padding-bottom: 16px;

  ${RecipeName} {
    margin: 0px;
    padding-bottom: 16px;
  }
`;

const List = styled(MUIList)`
  padding-left: 32px;
`;

interface RecipeProps{
  recipe: RecipeResponse.GetRecipeResponse;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const { routerContext } = useRouterContext();
  const history = useHistory();

  const [ingredientsOpen, setIngredientsOpen] = useState<boolean>(true);
  const [directionsOpen, setDirectionsOpen] = useState<boolean>(true);

  const ingredientItems: React.ReactElement[] = recipe.ingredients.map((ingredient, index) => <ListItem key={index}>{ingredient.amount} {ingredient.unit.name} {ingredient.name}</ListItem>);
  const directionItems: React.ReactElement[] = recipe.directions.map((direction, index) => <ListItem key={index}>{direction.directionNumber}. {direction.direction}</ListItem>);

  const handleIngredientsDrawerToggle = useCallback(() => {
    setIngredientsOpen(!ingredientsOpen);
  }, [setIngredientsOpen, ingredientsOpen]);

  const handleDirectionsDrawerToggle = useCallback(() => {
    setDirectionsOpen(!directionsOpen);
  }, [directionsOpen, setDirectionsOpen]);

  const handleEditRecipe = useCallback(() => {
    history.push(`${routerContext.url}/edit/${recipe.id}`);
  }, [history, routerContext]);

  return (
    <Container>
      <ImageContainer>
        <RecipeImage src={recipe.image}/>
        <IconButton onClick={handleEditRecipe}>
          <EditIcon src={EditIconSvg} height="32px" width="32px"/>
        </IconButton>
      </ImageContainer>
      <RecipeDetails>
        <RecipeName>
          {recipe.name}
        </RecipeName>
        <RecipeDescription>
          {recipe.description}
        </RecipeDescription>
      </RecipeDetails>
      <DropList title="Ingredients" open={ingredientsOpen} onToggle={handleIngredientsDrawerToggle}>
        <List>
          {ingredientItems}
        </List>
      </DropList>
      <DropList title="Directions" open={directionsOpen} onToggle={handleDirectionsDrawerToggle}>
        <List>
          {directionItems}
        </List>
      </DropList>
    </Container>
  );
};

export default Recipe;
