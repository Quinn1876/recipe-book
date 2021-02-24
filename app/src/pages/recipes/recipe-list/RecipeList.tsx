import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';

import RecipeListItem from './components/RecipeListItem';

import useRecipes from '../../../hooks/recipes';
import AddRecipeButton from './components/AddRecipeButton';
import UserInputModal from '../../../components/UserInputModal';
import useNewRecipeForm from './hooks/new-recipe-form';
import TextInput from '../../../components/FormControl/TextInput';

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
  const { recipes } = useRecipes();
  const [modalOpen, setModalOpen] = useState(true);

  const recipeItems = recipes.map(recipeMap);

  const {
    name,
    ingredients,
    directions,
    description,
    currentIngredient,
    currentDirection,
    updateName,
    updateDescription,
    addIngredient,
    addDirection,
    updateCurrentIngredient,
    updateCurrentDirection,
    changeCurrentIngredient,
    changeCurrentDirection,
    reset,
  } = useNewRecipeForm();

  const handleOpenModal = useCallback(() => {
    reset();
    setModalOpen(true);
  }, [reset, setModalOpen]);

  return (
    <>
      <Container container direction="column" alignItems="center">
        {recipeItems}
        <RecipeGridItem>
          <AddRecipeButton onClick={handleOpenModal} />
        </RecipeGridItem>
      </Container>
      <UserInputModal
        open={modalOpen}
        onClose={(): void => setModalOpen(false)}
        onSave={(): void => setModalOpen(false)}
        title="Add Recipe"
      >
        <Grid container>
          <Grid item sm={12} md={6}>
            <TextInput
              label="Name"
              value={name}
              onChange={(event): void => {updateName(event.target.value); }}
            />
          </Grid>
          <Grid item sm={12} md={6}>
            <TextInput
              label="Description"
              multiline
              value={description}
              onChange={(event): void => updateDescription(event.target.value)}
            />
          </Grid>
        </Grid>
      </UserInputModal>
    </>
  );
};

export default RecipeList;
