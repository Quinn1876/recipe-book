import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import MUIList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import UnstyledDropList from './components/DropList';

const DropList = styled(UnstyledDropList)``;

const ImageContainer = styled.div`
  width: 100%;
  height: 215px;

  background-color: ${({ theme }): string => theme.palette.primary.main};
  img {
    width: 100%;
    height: 215px;
    object-fit: cover;
  }
`;

const Container = styled.div`
  width: 100%;

@media only screen and (min-width: 600px) {
    width: 600px;
    margin: 32px;
    box-shadow: ${({ theme }): string => theme.shadow.shadow2};
    align-self: center;
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
  recipe: RecipeResponse;
}

const Recipe: React.FC<RecipeProps> = ({ recipe }) => {
  const [ingredientsOpen, setIngredientsOpen] = useState<boolean>(true);
  const [directionsOpen, setDirectionsOpen] = useState<boolean>(true);

  const ingredientItems: React.ReactElement[] = recipe.ingredients.map((ingredient, index) => <ListItem key={index}>{ingredient}</ListItem>);
  const directionItems: React.ReactElement[] = recipe.directions.map((direction, index) => <ListItem key={index}>{index + 1}. {direction}</ListItem>);

  const handleIngredientsDrawerToggle = useCallback(() => {
    setIngredientsOpen(!ingredientsOpen);
  }, [setIngredientsOpen, ingredientsOpen]);

  const handleDirectionsDrawerToggle = useCallback(() => {
    setDirectionsOpen(!directionsOpen);
  }, [directionsOpen, setDirectionsOpen]);

  return (
    <Container>
      <ImageContainer> <img src={recipe.image}/> </ImageContainer>
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
